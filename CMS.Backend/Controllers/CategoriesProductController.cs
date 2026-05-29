using CMS.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CMS.Backend.Controllers
{
    // 1. Định nghĩa đường dẫn để gọi API. [controller] sẽ tự lấy tên "Posts"
    // Khi chạy, địa chỉ sẽ là: https://localhost:xxxx/api/posts
    [Route("api/[controller]")]

    // 2. Đánh dấu đây là một API Controller để hệ thống hỗ trợ các tính năng RESTful
    [ApiController]

    // 3. API Controller phải kế thừa từ ControllerBase (thay vì Controller như MVC)
    public class CategoriesProductController : ControllerBase
    {
        // 4. Khai báo biến kết nối Database
        private readonly ApplicationDbContext _context;

        // 5. Hàm khởi tạo (Constructor): "Tiêm" kết nối Database vào để sử dụng
        public CategoriesProductController(ApplicationDbContext context)
        {
            _context = context;
        }

        // 1. Chỉ định đây là phương thức GET (Dùng để lấy dữ liệu)
        [HttpGet]
        public IActionResult GetAll()
        {
            // Lấy dữ liệu từ bảng Posts
            var categoryproduct = _context.CategoriesProducts
                .OrderByDescending(p => p.Id) // Sắp xếp bài mới nhất lên đầu
                .Select(p => new {            // "Gọt tỉa" dữ liệu: chỉ lấy những trường cần thiết
                    p.Id,
                    p.Name,
                    p.Description,
                })
                .ToList();

            // Trả về kết quả cho Frontend kèm mã trạng thái 200 (Thành công)
            return Ok(categoryproduct);
        }
        // 1. Định nghĩa đường dẫn nhận ID: api/categoryproduct/{id}
        [HttpGet("{id}")]
        public IActionResult GetDetail(int id)
        {
            // 2. Tìm bài viết đầu tiên có Id khớp với tham số truyền vào
            var pro = _context.CategoriesProducts
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
