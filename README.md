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
