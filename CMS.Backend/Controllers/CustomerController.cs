/*
 * Ho va ten: Tu Van Anh Truong
 * Mssv: 2123110486
 * Ngay tao: 29/05/2026
 */
using CMS.Data;
using CMS.Data.Entities;
using Humanizer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CMS.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly ApplicationDbContext _context;


        // Hàm khởi tạo "Tiêm" DbContext vào Controller
        public CustomerController(ApplicationDbContext context)
        {
            _context = context;
        }


        /// <summary>
        /// API Endpoint 1: POST api/Customers/register
        /// Tiếp nhận gói tin từ Form Đăng ký (Register.jsx)
        /// </summary>
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] CustomerRegisterDto model)
        {
            // Kiểm tra dữ liệu đầu vào
            if (model == null ||
                string.IsNullOrWhiteSpace(model.FullName) ||
                string.IsNullOrWhiteSpace(model.Email) ||
                string.IsNullOrWhiteSpace(model.Password))
            {
                return BadRequest(new
                {
                    message = "Vui lòng nhập đầy đủ họ tên, email và mật khẩu!"
                });
            }

            try
            {
                // Chuẩn hóa Email
                string email = model.Email.Trim().ToLower();

                // Kiểm tra Email đã tồn tại chưa
                bool isEmailExist = await _context.Customers
                    .AnyAsync(c => c.Email.ToLower() == email);

                if (isEmailExist)
                {
                    return BadRequest(new
                    {
                        message = "Email này đã được đăng ký!"
                    });
                }

                // Băm mật khẩu bằng BCrypt
                string passwordHash = BCrypt.Net.BCrypt.HashPassword(model.Password);

                // Tạo khách hàng mới
                var newCustomer = new Customer
                {
                    FullName = model.FullName.Trim(),
                    Email = email,
                    Phone = model.Phone?.Trim(),
                    Address = model.Address?.Trim(),
                    Password = passwordHash
                };

                _context.Customers.Add(newCustomer);

                await _context.SaveChangesAsync();

                return StatusCode(StatusCodes.Status201Created, new
                {
                    message = "Đăng ký tài khoản thành công!"
                });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new
                {
                    message = ex.Message
                });
            }
        }

        /// <summary>
        /// API Endpoint 2: POST api/Customers/login
        /// Xác thực thông tin từ Form Đăng nhập (Login.jsx)
        /// </summary>
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] CustomerLoginDto model)
        {
            if (model == null ||
                string.IsNullOrWhiteSpace(model.Email) ||
                string.IsNullOrWhiteSpace(model.Password))
            {
                return BadRequest(new
                {
                    message = "Tài khoản và mật khẩu không được để trống!"
                });
            }

            try
            {
                // Chỉ tìm theo Email
                var customer = await _context.Customers
                    .FirstOrDefaultAsync(c =>
                        c.Email.Trim().ToLower() == model.Email.Trim().ToLower());

                if (customer == null)
                {
                    return Unauthorized(new
                    {
                        message = "Tài khoản hoặc mật khẩu không chính xác!"
                    });
                }

                // Kiểm tra mật khẩu bằng BCrypt
                bool isPasswordCorrect =
                    BCrypt.Net.BCrypt.Verify(model.Password, customer.Password);

                if (!isPasswordCorrect)
                {
                    return Unauthorized(new
                    {
                        message = "Tài khoản hoặc mật khẩu không chính xác!"
                    });
                }

                // Đăng nhập thành công
                var customerSessionData = new
                {
                    id = customer.Id,
                    fullName = customer.FullName,
                    email = customer.Email,
                    phone = customer.Phone,
                    address = customer.Address
                };

                return Ok(customerSessionData);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = ex.Message
                });
            }
        }

        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword([FromBody] string email)
        {
            var customer = await _context.Customers
                .FirstOrDefaultAsync(x => x.Email == email.Trim().ToLower());

            if (customer == null)
            {
                return Ok(new { message = "Nếu email tồn tại, bạn sẽ nhận hướng dẫn!" });
            }

            var token = Guid.NewGuid().ToString();

            customer.ResetToken = token;
            customer.ResetTokenExpiry = DateTime.Now.AddMinutes(30);

            await _context.SaveChangesAsync();

            // 👉 ĐỒ ÁN: không gửi mail → trả link luôn
            var resetLink = $"http://localhost:3000/reset-password?email={email}&token={token}";

            return Ok(new
            {
                message = "Tạo link reset thành công",
                resetLink = resetLink
            });
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDto model)
        {
            var customer = await _context.Customers.FirstOrDefaultAsync(x =>
                x.Email == model.Email &&
                x.ResetToken == model.Token);

            if (customer == null || customer.ResetTokenExpiry < DateTime.Now)
            {
                return BadRequest(new { message = "Link không hợp lệ hoặc hết hạn" });
            }

            customer.Password = BCrypt.Net.BCrypt.HashPassword(model.NewPassword);

            customer.ResetToken = null;
            customer.ResetTokenExpiry = null;

            await _context.SaveChangesAsync();

            return Ok(new { message = "Đổi mật khẩu thành công" });
        }
    }


        // ────────────────────────────────────────────────────────
        // ĐỊNH NGHĨA CÁC ĐỐI TƯỢNG VẬN CHUYỂN DỮ LIỆU ĐẦU VÀO (DTO)
        // ────────────────────────────────────────────────────────
        public class CustomerRegisterDto
    {
        public string FullName { get; set; }
        public string Email { get; set; }
        public string? Phone { get; set; }
        public string? Address { get; set; }
        public string Password { get; set; }
    }


    public class CustomerLoginDto
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
    public class ResetPasswordDto
    {
        public string Email { get; set; }
        public string Token { get; set; }
        public string NewPassword { get; set; }
    }
}
