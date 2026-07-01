/*
 * Ho va ten: Tu Van Anh Truong
 * Mssv: 2123110486
 * Ngay tao: 22/05/2026
 */
using Microsoft.AspNetCore.Authorization;
using CMS.Data;
using CMS.Data.Entities;
//using CMS.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
//using Microsoft.AspNetCore.Mvc.Rendering;

namespace CMS.Backend.Controllers
{
    [Authorize(Roles = "Admin")]
    public class ProductController : Controller
    {
        private readonly ApplicationDbContext _context;

        // "Tiêm" kết nối vào Controller
        public ProductController(ApplicationDbContext context)
        {
            _context = context;
        }

        public IActionResult Index(int page = 1)
        {
            int pageSize = 5; // số sản phẩm / trang

            var query = _context.Products
                .OrderBy(p => p.Id);

            int totalItems = query.Count();

            var data = query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            ViewBag.CurrentPage = page;
            ViewBag.TotalPages = (int)Math.Ceiling((double)totalItems / pageSize);

            return View(data);
        }

        // GET: Hiển thị form thêm sản phẩm
        public IActionResult Create()
        {
            // Đổ dữ liệu CategoryProduct vào dropdown
            ViewBag.CategoryProductId = new SelectList(
                _context.CategoriesProducts,
                "Id",
                "Name"
            );

            return View();
        }

        // POST: Lưu sản phẩm vào SQL
        [HttpPost]
        public IActionResult Create(Product model)
        {
            if (ModelState.IsValid)
            {
                // Thêm dữ liệu vào bảng Products
                _context.Products.Add(model);

                // Lưu xuống SQL Server
                _context.SaveChanges();

                // Quay về trang danh sách
                return RedirectToAction("Index");
            }

            // Nếu lỗi thì load lại dropdown
            ViewBag.CategoryProductId = new SelectList(
                _context.CategoriesProducts,
                "Id",
                "Name"
            );

            return View(model);
        }

        // Delete: Xóa một sản phẩm theo Id
        // Xóa sản phẩm
        public IActionResult Delete(int id)
        {
            // Bước 1: Tìm sản phẩm theo Id
            var product = _context.Products.Find(id);

            // Kiểm tra nếu tồn tại thì mới xóa
            if (product != null)
            {
                // Bước 2: Xóa khỏi Entity Framework
                _context.Products.Remove(product);

                // Bước 3: Lưu thay đổi xuống SQL Server
                _context.SaveChanges();
            }

            // Quay lại trang danh sách
            return RedirectToAction("Index");
        }

        //Update: Cập nhật một sản phẩm
        // 1. Hàm GET: Tìm dữ liệu sản phẩm cũ và đổ lên Form
        [HttpGet]
        public IActionResult Edit(int id)
        {
            // Tìm sản phẩm trong Database theo Id
            var product = _context.Products.Find(id);

            // Nếu không tìm thấy thì báo lỗi 404
            if (product == null)
                return NotFound();

            // Load dropdown CategoryProduct
            ViewBag.CategoryProductId = new SelectList(
                _context.CategoriesProducts,
                "Id",
                "Name",
                product.CategoryProductId
            );

            // Gửi dữ liệu sang View Edit
            return View(product);
        }

        // 2. Hàm POST: Nhận dữ liệu mới từ Form và cập nhật
        [HttpPost]
        public IActionResult Edit(Product model)
        {
            if (ModelState.IsValid)
            {
                // Cập nhật sản phẩm
                _context.Products.Update(model);

                // Lưu xuống SQL Server
                _context.SaveChanges();

                // Quay lại trang danh sách
                return RedirectToAction("Index");
            }

            // Nếu lỗi thì load lại dropdown
            ViewBag.CategoryProductId = new SelectList(
                _context.CategoriesProducts,
                "Id",
                "Name",
                model.CategoryProductId
            );

            return View(model);
        }
    }
}
