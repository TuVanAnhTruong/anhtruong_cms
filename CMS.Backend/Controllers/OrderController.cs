/*
 * Ho va ten: Tu Van Anh Truong
 * Mssv: 2123110486
 * Ngay tao: 29/05/2026
 */
using CMS.Data;
using CMS.Data.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CMS.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        // 4. Khai báo biến kết nối Database
        private readonly ApplicationDbContext _context;

        // 5. Hàm khởi tạo (Constructor): "Tiêm" kết nối Database vào để sử dụng
        public OrderController(ApplicationDbContext context)
        {
            _context = context;
        }

        // 1. Chỉ định đây là phương thức GET (Dùng để lấy dữ liệu)
        [HttpGet]
        public IActionResult GetAll()
        {
            // Lấy dữ liệu từ bảng Orders
            var order = _context.Orders
                .OrderByDescending(p => p.Id) // Sắp xếp bài mới nhất lên đầu
                .Select(p => new {            // "Gọt tỉa" dữ liệu: chỉ lấy những trường cần thiết
                    p.Id,
                    p.OrderDate,
                    p.Status,
                    p.Notes,
                    Customer = p.Customer.Id, // Lấy tên danh mục thay vì chỉ lấy ID

                })
                .ToList();

            // Trả về kết quả cho Frontend kèm mã trạng thái 200 (Thành công)
            return Ok(order);
        }
        [HttpPost]
        public async Task<IActionResult> CreateOrder([FromBody] OrderInputDTO input)
        {
            // 1. Kiểm tra kịch bản lỗi bảo vệ: Nếu dữ liệu truyền lên trống rỗng
            if (input == null)
            {
                return BadRequest(new { message = "Dữ liệu đơn hàng không hợp lệ" });
            }

            try
            {
                // Bước A: Tự động khởi tạo cấu trúc thực thể Đơn hàng mới
                // LƯU Ý: Đã hiệu chỉnh bỏ trường TotalAmount, dùng trường [Notes] số nhiều theo đúng hình ảnh thực tế
                var newOrder = new Order
                {
                    OrderDate = DateTime.Now, // Tự động lấy ngày giờ thực tế máy tính lúc mua
                    CustomerId = input.CustomerId,
                    Status = 0,               // 0: Mặc định đơn hàng mới ở trạng thái "Chờ xử lý"
                    Notes = input.Notes
                };

                // Bước B: Thêm vào bảng tạm và chốt lưu xuống SQL Server
                _context.Orders.Add(newOrder);
                await _context.SaveChangesAsync(); // Ép hệ thống sinh ra mã ID Đơn hàng tự động tăng

                // Bước C: Trả về mã thành công 201 Created và gửi ngược lại mã ID đơn hàng vừa tạo
                return StatusCode(201, new
                {
                    message = "Đặt hàng thành công!",
                    orderId = newOrder.Id
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Lỗi xử lý tạo đơn hàng ngầm", detail = ex.Message });
            }
        }
    }

    // LỚP DTO TRUNG GIAN ĐỂ HỨNG DỮ LIỆU TỪ FRONTEND TRUYỀN LÊN
    public class OrderInputDTO
    {
        public int CustomerId { get; set; }
        public string Notes { get; set; }
    }
}

