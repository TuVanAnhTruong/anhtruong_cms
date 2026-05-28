# BUỔI 5: SECURITY & IDENTITY

## Mục tiêu

* Tìm hiểu Authentication và Authorization trong ASP.NET Core MVC.
* Xây dựng chức năng Đăng nhập / Đăng xuất bằng Cookie Authentication.
* Phân quyền người dùng theo Role (Admin, Editor).
* Hiển thị thông tin người dùng đang đăng nhập.
* Bảo vệ các trang quản trị bằng `[Authorize]`.

---

# 1. Authentication (Xác thực người dùng)

## Login Flow

1. Người dùng nhập Username và Password.
2. Hệ thống kiểm tra thông tin trong bảng `Users`.
3. Nếu đúng:

   * Tạo Cookie đăng nhập.
   * Lưu thông tin người dùng bằng Claims.
4. Chuyển hướng vào trang quản trị.

---

# 2. Cấu hình Cookie Authentication

## Program.cs

Khai báo dịch vụ xác thực Cookie:

```csharp
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.LoginPath = "/Account/Login";
        options.AccessDeniedPath = "/Account/AccessDenied";
    });
```

Thêm Middleware:

```csharp
app.UseAuthentication();
app.UseAuthorization();
```

---

# 3. Chức năng Login

## AccountController

Tạo `AccountController` để xử lý:

* Login
* Logout
* AccessDenied

### GET Login

Hiển thị giao diện đăng nhập.

```csharp
[HttpGet]
public IActionResult Login()
{
    return View();
}
```

### POST Login

* Kiểm tra Username/Password trong Database.
* Tạo Claims:

  * Username
  * Role
  * FullName
* Tạo Cookie đăng nhập bằng `SignInAsync()`.

```csharp
await HttpContext.SignInAsync(
    CookieAuthenticationDefaults.AuthenticationScheme,
    new ClaimsPrincipal(claimsIdentity));
```

---

# 4. Logout

Xóa Cookie đăng nhập:

```csharp
await HttpContext.SignOutAsync(
    CookieAuthenticationDefaults.AuthenticationScheme);
```

---

# 5. Authorization (Phân quyền)

## Bảo vệ Controller

```csharp
[Authorize]
public class PostController : Controller
{
}
```

Người chưa đăng nhập sẽ tự động chuyển về `/Account/Login`.

---

# 6. Phân quyền theo Role

## Chỉ Admin được quản lý User

```csharp
[Authorize(Roles = "Admin")]
public class UserController : Controller
{
}
```

* Admin: truy cập toàn bộ hệ thống.
* Editor: chỉ quản lý bài viết.

---

# 7. Hiển thị thông tin người dùng

Trong `_LayoutAdmin.cshtml`:

```cshtml
@User.FindFirst("FullName")?.Value
```

Hiển thị:

* Họ tên
* Vai trò
* Nút Đăng xuất

---

# 8. Trang Access Denied

Khi người dùng không đủ quyền truy cập:

* Chuyển tới `/Account/AccessDenied`
* Hiển thị lỗi 403.

```csharp
public IActionResult AccessDenied()
{
    return View();
}
```

---

# 9. Kết quả đạt được

* Đăng nhập bằng Cookie Authentication.
* Tạo và lưu Claims cho người dùng.
* Phân quyền Admin / Editor.
* Bảo vệ các trang quản trị.
* Hiển thị thông tin tài khoản đăng nhập.
* Đăng xuất và xóa Cookie thành công.
