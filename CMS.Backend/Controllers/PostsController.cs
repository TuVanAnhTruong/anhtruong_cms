/*
 * Ho va ten: Tu Van Anh Truong
 * Mssv: 2123110486
 * Ngay tao: 29/05/2026
 */
using CMS.Data; // Thay bằng Namespace của project chứa ApplicationDbContext của bạn
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CMS.Backend.Controllers
{
    // 1. Định nghĩa đường dẫn để gọi API. [controller] sẽ tự lấy tên "Posts"
    // Khi chạy, địa chỉ sẽ là: https://localhost:xxxx/api/posts
    [Route("api/[controller]")]

    // 2. Đánh dấu đây là một API Controller để hệ thống hỗ trợ các tính năng RESTful
    [ApiController]

    // 3. API Controller phải kế thừa từ ControllerBase (thay vì Controller như MVC)
    public class PostsController : ControllerBase
    {
        // 4. Khai báo biến kết nối Database
        private readonly ApplicationDbContext _context;

        // 5. Hàm khởi tạo (Constructor): "Tiêm" kết nối Database vào để sử dụng
        public PostsController(ApplicationDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// API Endpoint 1: GET https://localhost:7284/api/Posts
        /// Nhận tham số lọc động gửi từ { params: filters } của dịch vụ postService.js
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] int? categoryId)
        {
            try
            {
                // Bước A: Khởi tạo câu truy vấn dạng IQueryable để tối ưu hiệu năng (Deferred Execution)
                var query = _context.Posts.AsQueryable();


                // Bước B: Kiểm tra điều kiện lọc. 
                // Nếu FrontEnd bấm vào một danh mục cụ thể (selectedCategory khác null), tiến hành lọc câu lệnh SQL
                if (categoryId.HasValue)
                {
                    query = query.Where(p => p.CategoryId == categoryId.Value);
                }


                // Sắp xếp bài viết mới xuất bản lên đầu tiên
                query = query.OrderByDescending(p => p.CreatedDate);


                // Bước C: Thực thi câu lệnh xuống SQL Server và lấy mảng kết quả sạch trả về
                var result = await query.ToListAsync();


                return Ok(result); // Trả về HTTP 200 kèm mảng bài viết JSON đã thanh lọc
            }
            catch (Exception ex)
            {
                // Ghi nhận nhật ký lỗi hệ thống, ngăn chặn sập ứng dụng Backend
                return StatusCode(500, $"Lỗi hệ thống SQL Server khi tải danh sách tin tức: {ex.Message}");
            }
        }


        // 2. Định nghĩa đường dẫn có tham số: api/posts/category/{id}
        [HttpGet("category/{categoryId}")]
        public IActionResult GetByCategory(int categoryId)
        {
            // Lọc các bài viết có CategoryId trùng với ID truyền vào từ URL
            var posts = _context.Posts
                .Where(p => p.CategoryId == categoryId)
                .Select(p => new
                {
                    p.Id,
                    p.Title,
                    p.Content,
                    p.ImageUrl,
                    p.CreatedDate
                })
                .ToList();

            return Ok(posts);
        }

        /// <summary>
        /// API Endpoint 2: GET https://localhost:7111/api/Posts/{id}
        /// Truy vấn chi tiết một bài viết độc bản theo khóa chính ID phục vụ trang BlogDetail
        /// </summary>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetDetail(int id)
        {
            try
            {
                // Quét bảng Posts để tìm bài viết đầu tiên có ID khớp với tham số trên URL trình duyệt
                var post = await _context.Posts.FirstOrDefaultAsync(p => p.Id == id);


                // Bảo vệ hệ thống: Xử lý kịch bản nếu ID truyền lên bừa bãi không tồn tại trong DB
                if (post == null)
                {
                    return NotFound(new { message = "Bài viết này không tồn tại hoặc đã bị gỡ bỏ khỏi hệ thống ThaiCMS" });
                }


                // Trả về toàn bộ đối tượng (bao gồm cả trường Content chứa chuỗi HTML thô từ CKEditor)
                return Ok(post);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Lỗi hệ thống SQL Server khi tải chi tiết bài viết: {ex.Message}");
            }
        }
    }



}

