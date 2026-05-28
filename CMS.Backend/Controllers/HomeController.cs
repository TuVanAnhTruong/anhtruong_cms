using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CMS.Data;
using System.Linq;

namespace CMS.Backend.Controllers
{
    public class HomeController : Controller
    {
        private readonly ApplicationDbContext _context;

        public HomeController(ApplicationDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            // LINQ: L?y 3 bài vi?t m?i nh?t
            var latestPosts = _context.Posts
                              .Include(p => p.Category) // L?y kèm tên danh m?c
                              .OrderByDescending(p => p.CreatedDate) // M?i nh?t lên ??u
                              .Take(3) // L?y 3 bài vi?t
                              .ToList();

            return View(latestPosts);
        }
    }
}