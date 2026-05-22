/*
 * Ho va ten: Tu Van Anh Truong
 * Mssv: 2123110486
 * Ngay tao: 22/05/2026
 */
using CMS.Data;
using CMS.Data.Entities; // Phải có dòng này để dùng lớp User
using Microsoft.AspNetCore.Mvc;

namespace CMS.Backend.Controllers
{
    public class UserController : Controller
    {
        private readonly ApplicationDbContext _context;

        // "Tiêm" kết nối vào Controller
        public UserController(ApplicationDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            var users = _context.Users.ToList(); // Lấy tất cả bài viết
            return View(users);
        }
    }
}