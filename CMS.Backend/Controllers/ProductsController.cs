using CMS.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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

        // 1. Chỉ định đây là phương thức GET (Dùng để lấy dữ liệu)
        [HttpGet]
        public IActionResult GetAll()
        {
            // Lấy dữ liệu từ bảng Products
            var pro = _context.Products
                .OrderByDescending(p => p.Id) // Sắp xếp bài mới nhất lên đầu
                .Select(p => new {            // "Gọt tỉa" dữ liệu: chỉ lấy những trường cần thiết
                    p.Id,
                    p.Name,
                    p.Description,
                    p.Price,
                    p.StockQuantity,
                    p.ImageUrl,
                    CategoryProduct = p.CategoryProduct.Id // Lấy tên danh mục thay vì chỉ lấy ID
                })
                .ToList();

            // Trả về kết quả cho Frontend kèm mã trạng thái 200 (Thành công)
            return Ok(pro);
        }
        // 2. Định nghĩa đường dẫn có tham số: api/categoriesproduct/CategoryProduct/{id}
        [HttpGet("categoriesproduct/{CategoryProduct}")]
        public IActionResult GetByCategory(int CategoryProduct)
        {
            // Lọc các bài viết có categoriesproductId trùng với ID truyền vào từ URL
            var pro = _context.Products
                .Where(p => p.CategoryProductId == CategoryProduct)
                .Select(p => new {
                    p.Id,
                    p.Name,
                    p.Description,
                    p.Price,
                    p.StockQuantity,
                    p.ImageUrl
                })
                .ToList();

            return Ok(pro);
        }

        // 1. Định nghĩa đường dẫn nhận ID: api/products/{id}
        [HttpGet("{id}")]
        public IActionResult GetDetail(int id)
        {
            // 2. Tìm bài viết đầu tiên có Id khớp với tham số truyền vào
            var pro = _context.Products
                .FirstOrDefault(p => p.Id == id);

            // 3. Xử lý trường hợp không tìm thấy (ID không tồn tại)
            if (pro == null)
            {
                // Trả về lỗi 404 kèm thông báo dưới dạng JSON
                return NotFound(new { message = "Không tìm thấy bài viết này trong hệ thống" });
            }

            // 4. Trả về bài viết tìm thấy kèm mã 200 (Thành công)
            return Ok(pro);
        }
    }
}
