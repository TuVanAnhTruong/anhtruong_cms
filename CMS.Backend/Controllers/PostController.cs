/*
 * Ho va ten: Tu Van Anh Truong
 * Mssv: 2123110486
 * Ngay tao: 22/05/2026
 */
using CMS.Data;
using CMS.Data.Entities; // Quan trọng: Phải có dòng này để dùng lớp Post
using Microsoft.AspNetCore.Mvc;

namespace CMS.Backend.Controllers
{
    public class PostController : Controller
    {
        private readonly ApplicationDbContext _context;

        // "Tiêm" kết nối vào Controller
        public PostController(ApplicationDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            var posts = _context.Posts.ToList(); // Lấy tất cả bài viết
            return View(posts);
        }
    }
}