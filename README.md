# Hướng dẫn chạy dự án

## Backend

1. Mở Solution bằng Visual Studio
2. Chọn Startup Project
3. Nhấn F5 để chạy API

## FrontEnd

1. Mở Terminal
2. Di chuyển vào thư mục frontend

cd frontend

3. Cài package

npm install

4. Chạy dự án

npm start

Frontend chạy tại:
http://localhost:3000

CMS Full-Stack Project – Buổi 1: Khởi tạo hệ thống
🎯 Mục tiêu
Thiết lập kiến trúc 3 lớp (Data – Backend – Frontend) cho hệ thống CMS.
Xây dựng và định nghĩa các Entity (bảng dữ liệu) chính.
Hiểu mối quan hệ giữa các bảng trong hệ thống quản lý nội dung (Database Design).
Tạo nền tảng cho việc phát triển CRUD và kết nối Database bằng EF Core.
🏗 Kiến trúc hệ thống
1. CMS.Data (Data Layer)

Chứa toàn bộ Entity (Model Database):

Category (Danh mục bài viết)
Post (Bài viết)
User (Người dùng quản trị)
CategoryProduct (Danh mục sản phẩm)
Product (Sản phẩm)
Customer (Khách hàng)
Order (Đơn hàng)
OrderDetail (Chi tiết đơn hàng)

👉 Đây là tầng “core” định nghĩa cấu trúc dữ liệu và quan hệ giữa các bảng.

2. CMS.Backend (ASP.NET Core MVC)
Xây dựng hệ thống Admin Dashboard
Quản lý:
Bài viết
Sản phẩm
Người dùng
Danh mục
Sử dụng MVC Pattern
Tạo Controller + View để hiển thị dữ liệu

👉 Hiện tại sử dụng Mock Data (dữ liệu giả) để kiểm thử luồng hoạt động.

3. CMS.Frontend (ReactJS)
Giao diện người dùng (User Interface)
Hiển thị bài viết / sản phẩm cho khách hàng
Kết nối Backend thông qua API (giai đoạn sau)
🔄 Luồng hoạt động hệ thống
CMS.Data (Entity Models)
        ↓
CMS.Backend (MVC / API)
        ↓
CMS.Frontend (ReactJS)
🧪 Demo chức năng đã thực hiện
📂 Category Management
Hiển thị danh sách danh mục dạng bảng
Dữ liệu mock trong Controller
📝 Post Management
Danh sách bài viết dạng card
Trang chi tiết bài viết (Details View)
👤 User Management
Hiển thị danh sách tài khoản quản trị
Phân quyền: Administrator / Editor / Author
💡 Kỹ thuật đã áp dụng
ASP.NET Core MVC
Entity Framework Core (thiết kế entity)
Razor View Engine
Bootstrap UI
ReactJS (frontend setup)
Kiến trúc 3-layer (Separation of Concerns)
🚀 Kết quả đạt được
Xây dựng thành công nền tảng CMS full-stack
Hiểu rõ luồng dữ liệu từ Data → Backend → Frontend
Chuẩn bị sẵn kiến trúc để:
Kết nối database thật (SQL Server)
Tích hợp API
CRUD hoàn chỉnh
Phân trang + tìm kiếm + phân quyền

# Buổi 2 – Tích hợp Entity Framework Core và xây dựng cơ sở dữ liệu

## Mục tiêu

Xây dựng tầng truy cập dữ liệu cho hệ thống CMS bằng Entity Framework Core, kết nối thành công với SQL Server và chuyển đổi từ dữ liệu giả (Mock Data) sang dữ liệu thực được lưu trữ trong cơ sở dữ liệu.

## Công việc thực hiện

### 1. Cài đặt và cấu hình Entity Framework Core

* Tích hợp các thư viện:

  * Microsoft.EntityFrameworkCore.SqlServer
  * Microsoft.EntityFrameworkCore.Tools
  * Microsoft.EntityFrameworkCore.Design
* Thiết lập môi trường làm việc giữa ASP.NET Core MVC và SQL Server.

### 2. Xây dựng ApplicationDbContext

* Thiết kế lớp ApplicationDbContext làm trung tâm quản lý dữ liệu.
* Khai báo các DbSet tương ứng với các bảng:

  * Categories
  * Posts
  * Users
  * CategoriesProducts
  * Products
  * Customers
  * Orders
  * OrderDetails

### 3. Cấu hình kết nối cơ sở dữ liệu

* Thiết lập Connection String trong appsettings.json.
* Đăng ký DbContext trong Program.cs thông qua Dependency Injection.
* Kết nối thành công ứng dụng với SQL Server.

### 4. Áp dụng Code First Migration

* Sử dụng phương pháp Code First để sinh cơ sở dữ liệu từ các lớp Entity.
* Tạo Migration đầu tiên bằng lệnh:

  * Add-Migration InitialCreate
* Khởi tạo Database và các bảng dữ liệu bằng lệnh:

  * Update-Database

### 5. Thay thế Mock Data bằng dữ liệu thực

* Refactor các Controller từ việc sử dụng danh sách dữ liệu giả sang truy vấn trực tiếp từ SQL Server thông qua Entity Framework Core.
* Áp dụng cho các module:

  * Quản lý danh mục bài viết
  * Quản lý bài viết
  * Quản lý sản phẩm
  * Quản lý người dùng

## Kết quả đạt được

* Xây dựng thành công cơ sở dữ liệu SQL Server theo mô hình Code First.
* Thiết lập hoàn chỉnh tầng truy cập dữ liệu bằng Entity Framework Core.
* Thực hiện truy vấn dữ liệu thực thông qua DbContext.
* Hoàn thiện nền tảng cho các chức năng CRUD ở các giai đoạn tiếp theo.
* Tăng khả năng mở rộng và bảo trì hệ thống nhờ áp dụng kiến trúc phân lớp (Data Layer – Business Layer – Presentation Layer).

## Công nghệ sử dụng

* ASP.NET Core MVC
* Entity Framework Core
* SQL Server
* LINQ
* Dependency Injection
* Code First Migration
# Buổi 3 – Truy vấn dữ liệu với LINQ và triển khai CRUD hoàn chỉnh

## Mục tiêu

Triển khai các thao tác truy vấn và quản lý dữ liệu trên hệ thống CMS bằng Entity Framework Core, áp dụng LINQ để xử lý dữ liệu và xây dựng đầy đủ các chức năng CRUD cho module Danh mục (Category).

## Công việc thực hiện

### 1. Truy vấn dữ liệu với LINQ

Áp dụng LINQ để thao tác dữ liệu từ SQL Server thông qua Entity Framework Core:

* Sử dụng `Where()` để lọc dữ liệu theo điều kiện.
* Sử dụng `OrderBy()` và `OrderByDescending()` để sắp xếp dữ liệu.
* Sử dụng `FirstOrDefault()` để truy xuất bản ghi đơn lẻ.
* Xây dựng chức năng lọc bài viết theo danh mục động thông qua tham số URL.

Ví dụ:

* Lọc bài viết theo `CategoryId`.
* Sắp xếp bài viết theo ngày đăng mới nhất.
* Hiển thị danh sách bài viết theo từng chuyên mục.

### 2. Tối ưu truy vấn với Eager Loading

Sử dụng kỹ thuật Eager Loading thông qua `Include()` để lấy dữ liệu từ các bảng liên kết.

Các quan hệ đã xử lý:

* Post → Category
* Product → CategoryProduct
* Order → Customer
* OrderDetail → Product

Kết quả:

* Hiển thị được thông tin danh mục ngay trong danh sách bài viết.
* Hạn chế lỗi dữ liệu null khi truy cập Navigation Property.
* Giảm số lượng truy vấn phát sinh trong quá trình hiển thị dữ liệu.

### 3. Xây dựng chức năng xem chi tiết dữ liệu (Details)

Triển khai chức năng xem chi tiết bài viết:

* Truy vấn dữ liệu theo khóa chính (Id).
* Kết hợp `Include()` để lấy thông tin liên quan.
* Xử lý trường hợp không tìm thấy dữ liệu bằng `NotFound()`.

Kết quả:

* Người dùng có thể xem nội dung đầy đủ của bài viết.
* Hệ thống xử lý an toàn khi URL không hợp lệ.

### 4. Triển khai chức năng thêm mới dữ liệu (Create)

Xây dựng quy trình thêm dữ liệu mới vào hệ thống:

* Thiết kế Form nhập liệu bằng Razor View.
* Nhận dữ liệu từ người dùng thông qua HTTP POST.
* Sử dụng:

  * `_context.Add()`
  * `_context.SaveChanges()`

Kết quả:

* Dữ liệu được lưu trực tiếp vào SQL Server.
* Giao diện tự động chuyển về trang danh sách sau khi lưu thành công.

### 5. Triển khai chức năng xóa dữ liệu (Delete)

Xây dựng chức năng xóa danh mục:

* Tìm dữ liệu bằng `Find()`.
* Đánh dấu xóa bằng `Remove()`.
* Ghi thay đổi xuống cơ sở dữ liệu bằng `SaveChanges()`.

Bổ sung:

* Hộp thoại xác nhận trước khi xóa bằng JavaScript.
* Xử lý trường hợp dữ liệu không tồn tại.

### 6. Triển khai chức năng cập nhật dữ liệu (Edit)

Xây dựng quy trình chỉnh sửa dữ liệu theo mô hình GET/POST:

#### GET

* Tìm dữ liệu theo Id.
* Hiển thị thông tin hiện tại lên Form.

#### POST

* Nhận dữ liệu đã chỉnh sửa.
* Cập nhật thông tin bằng `Update()`.
* Lưu thay đổi bằng `SaveChanges()`.

Kết quả:

* Người dùng có thể chỉnh sửa thông tin trực tiếp trên giao diện quản trị.
* Dữ liệu được đồng bộ với SQL Server sau khi cập nhật.

## Kỹ thuật và công nghệ áp dụng

* ASP.NET Core MVC
* Entity Framework Core
* LINQ Query
* Eager Loading (Include)
* SQL Server
* Razor View Engine
* CRUD Operations
* Dependency Injection

## Kết quả đạt được

* Thay thế hoàn toàn dữ liệu giả bằng dữ liệu thực từ SQL Server.
* Thành thạo các kỹ thuật truy vấn dữ liệu với LINQ.
* Xây dựng hoàn chỉnh các chức năng:

  * Create
  * Read
  * Update
  * Delete
* Hiểu và áp dụng hiệu quả mô hình làm việc của Entity Framework Core.
* Hoàn thiện nền tảng dữ liệu cho các module quản trị nội dung của hệ thống CMS.

