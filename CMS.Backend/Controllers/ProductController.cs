/*
 * Ho va ten: Tu Van Anh Truong
 * Mssv: 2123110486
 * Ngay tao: 22/05/2026
 */
using CMS.Data;
using Microsoft.AspNetCore.Mvc;

namespace CMS.Backend.Controllers
{
    public class ProductController : Controller
    {
        private readonly ApplicationDbContext _context;

        // "Tiêm" kết nối vào Controller
        public ProductController(ApplicationDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            // Lấy dữ liệu THẬT từ bảng Products trong SQL
            var data = _context.Products.ToList();
            return View(data);
        }
    }
}
