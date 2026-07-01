/*
 * Ho va ten: Tu Van Anh Truong
 * Mssv: 2123110486
 * Ngay tao: 22/05/2026
 */
using CMS.Data;
using CMS.Data.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace CMS.Backend.Controllers
{
    [Authorize(Roles = "Admin")]
    public class CategoriesProductsController : Controller
    {
        
        private readonly ApplicationDbContext _context;

        // "Tiêm" kết nối vào Controller
        public CategoriesProductsController(ApplicationDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            // Lấy dữ liệu THẬT từ bảng CategoriesProducts trong SQL
            var data = _context.CategoriesProducts.ToList();
            return View(data);
        }
        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }

        // 4. POST: Thực hiện lưu danh mục mới vào CSDL
        [HttpPost]
        public IActionResult Create(CategoryProduct model)
        {
            _context.CategoriesProducts.Add(model);
            _context.SaveChanges();
            return RedirectToAction("Index");
        }

        // 5. GET: Hiển thị form Sửa kèm dữ liệu cũ của danh mục
        [HttpGet]
        public IActionResult Edit(int id)
        {
            var category = _context.CategoriesProducts.Find(id);
            if (category == null) return NotFound();

            return View(category);
        }

        // 6. POST: Thực hiện cập nhật thay đổi danh mục
        [HttpPost]
        public IActionResult Edit(CategoryProduct model)
        {
            _context.CategoriesProducts.Update(model);
            _context.SaveChanges();
            return RedirectToAction("Index");
        }

        // 7. GET/POST: Xóa danh mục sản phẩm theo Id
        public IActionResult Delete(int id)
        {
            var category = _context.CategoriesProducts.Find(id);
            if (category != null)
            {
                _context.CategoriesProducts.Remove(category);
                _context.SaveChanges();
            }
            return RedirectToAction("Index");
        }
    }
}
