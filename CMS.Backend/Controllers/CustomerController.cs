/*
 * Ho va ten: Tu Van Anh Truong
 * Mssv: 2123110486
 * Ngay tao: 29/05/2026
 */
using CMS.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CMS.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        // 4. Khai báo biến kết nối Database
        private readonly ApplicationDbContext _context;

        // 5. Hàm khởi tạo (Constructor): "Tiêm" kết nối Database vào để sử dụng
        public CustomerController(ApplicationDbContext context)
        {
            _context = context;
        }

        // 1. Chỉ định đây là phương thức GET (Dùng để lấy dữ liệu)
        [HttpGet]
        public IActionResult GetAll()
        {
            // Lấy dữ liệu từ bảng Customers
            var cus = _context.Customers
                .OrderByDescending(p => p.Id) // Sắp xếp bài mới nhất lên đầu
                .Select(p => new {            // "Gọt tỉa" dữ liệu: chỉ lấy những trường cần thiết
                    p.Id,
                    p.FullName,
                    p.Email,
                    p.Phone,
                    p.Address,
                    p.Password
                })
                .ToList();

            // Trả về kết quả cho Frontend kèm mã trạng thái 200 (Thành công)
            return Ok(cus);
        }
    }
}
