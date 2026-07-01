using CMS.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CMS.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        // 4. Khai báo biến kết nối Database
        private readonly ApplicationDbContext _context;

        // 5. Hàm khởi tạo (Constructor): "Tiêm" kết nối Database vào để sử dụng
        public ProductsController(ApplicationDbContext context)
        {
            _context = context;
        }

        /// 1. 
        /// <summary>
        /// API Endpoint: GET https://localhost:xxxx/api/Products
        /// Nhận các tham số lọc động được gửi từ { params: filters } của ReactJS
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> GetAll(
            [FromQuery] int? categoryProductId,
            [FromQuery] decimal? minPrice,
            [FromQuery] decimal? maxPrice,
            [FromQuery] string? keyword)
        {
            try
            {
                // Bước 1: Khởi tạo câu truy vấn dạng IQueryable để tối ưu hiệu năng (Chưa thực thi xuống Database)
                var query = _context.Products.AsQueryable();


                // Bước 2: Kiểm tra và cộng dồn các điều kiện lọc bằng LINQ (Cơ chế Deferred Execution)


                // Lọc theo Danh mục sản phẩm nếu FrontEnd có truyền categoryProductId khác null
                if (categoryProductId.HasValue)
                {
                    query = query.Where(p => p.CategoryProductId == categoryProductId.Value);
                }


                // Lọc theo Sàn giá tối thiểu
                if (minPrice.HasValue)
                {
                    query = query.Where(p => p.Price >= minPrice.Value);
                }


                // Lọc theo Trần giá tối đa
                if (maxPrice.HasValue)
                {
                    query = query.Where(p => p.Price <= maxPrice.Value);
                }


                // Tìm kiếm gần đúng theo từ khóa tên sản phẩm (Không phân biệt hoa thường trong SQL)
                if (!string.IsNullOrEmpty(keyword))
                {
                    // Sử dụng hàm Contains để sinh ra câu lệnh LIKE '%keyword%' trong T-SQL
                    query = query.Where(p => p.Name.Contains(keyword.Trim()));
                }


                // Bước 3: Đẩy câu lệnh SQL hoàn chỉnh xuống SQL Server và lấy mảng kết quả sạch trả về
                var result = await query.ToListAsync();


                return Ok(result); // Trả về mã HTTP 200 kèm mảng dữ liệu JSON đã thanh lọc
            }
            catch (System.Exception ex)
            {
                // Tránh sập ứng dụng Backend, ghi nhận nhật ký lỗi hệ thống
                return StatusCode(500, $"Lỗi hệ thống SQL Server: {ex.Message}");
            }
        }

        // 2. Định nghĩa đường dẫn chứa tham số động: api/products/categoryproduct/{categoryproductId}
        [HttpGet("categoryproduct/{categoryProductId}")]
        public async Task<IActionResult> GetByCategoryProduct(int categoryProductId)
        {
            // Lọc các bài viết có CategoryId trùng với ID truyền vào từ thanh URL
            var products = await _context.Products
                .Where(p => p.CategoryProductId == categoryProductId)
                .ToListAsync();


            return Ok(products);
        }


        // 1. Định nghĩa đường dẫn nhận ID: api/products/{id}
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetDetail(int id)
        {
            // 3.1. Quét bảng Products để tìm sản phẩm đầu tiên có Id khớp với tham số
            var product = await _context.Products
                .FirstOrDefaultAsync(p => p.Id == id);


            // 3.2 Xử lý kịch bản lỗi bảo vệ hệ thống: ID không tồn tại trong Database
            if (product == null)
            {
                // Trả về mã lỗi 404 kèm một "gói tin" JSON thông báo nhỏ gọn để Frontend tự xử lý UI
                return NotFound(new { message = "Không tìm thấy sản phẩm này trong hệ thống" });
            }


            // 3.3. Trả về toàn bộ đối tượng sản phẩm (bao gồm cả trường Content chứa mã HTML) kèm mã 200 OK
            return Ok(product);
        }

        //Sản phẩm nổi bật
        [HttpGet("featured")]
        public IActionResult Featured([FromQuery] int? categoryProductId)
        {
            var query = _context.Products.Where(x => x.IsFeatured);

            if (categoryProductId.HasValue && categoryProductId != 0)
            {
                query = query.Where(x => x.CategoryProductId == categoryProductId);
            }

            var data = query.Take(4).ToList();

            return Ok(data);
        }
        //Sản phẩm mới
        [HttpGet("new")]
        public IActionResult NewProducts([FromQuery] int? categoryProductId)
        {
            var query = _context.Products.AsQueryable();

            if (categoryProductId.HasValue && categoryProductId != 0)
            {
                query = query.Where(x => x.CategoryProductId == categoryProductId);
            }

            var data = query
                .OrderByDescending(x => x.CreatedAt)
                .Take(3)
                .ToList();

            return Ok(data);
        }
        //Bán chạy
        [HttpGet("bestseller")]
        public IActionResult BestSeller([FromQuery] int? categoryProductId)
        {
            var orderQuery = _context.OrderDetails.AsQueryable();

            if (categoryProductId.HasValue && categoryProductId != 0)
            {
                orderQuery = orderQuery.Where(x => x.Product.CategoryProductId == categoryProductId);
            }

            var data = orderQuery
                .GroupBy(x => x.ProductId)
                .Select(g => new
                {
                    ProductId = g.Key,
                    TotalSold = g.Sum(x => x.Quantity)
                })
                .OrderByDescending(x => x.TotalSold)
                .Take(3)
                .Join(
                    _context.Products,
                    sold => sold.ProductId,
                    product => product.Id,
                    (sold, product) => new
                    {
                        product.Id,
                        product.Name,
                        product.Price,
                        product.ImageUrl,
                        product.Description,
                        product.StockQuantity,
                        product.DiscountPercent,
                        product.IsFeatured,
                        product.IsNew,
                        TotalSold = sold.TotalSold,
                        product.CategoryProductId
                    }
                )
                .ToList();

            return Ok(data);
        }
        //Giảm giá
        [HttpGet("discount")]
        public IActionResult Discount([FromQuery] int? categoryProductId)
        {
            var query = _context.Products
                .Where(x => x.DiscountPercent > 0);

            if (categoryProductId.HasValue && categoryProductId != 0)
            {
                query = query.Where(x => x.CategoryProductId == categoryProductId);
            }

            var data = query.Take(4).ToList();

            return Ok(data);
        }
        [HttpGet("search")]
        public IActionResult Search(string keyword)
        {
            var data = _context.Products
                .Where(x => x.Name.Contains(keyword))
                .ToList();

            return Ok(data);
        }
    }
}
