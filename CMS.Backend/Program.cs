using CMS.Data;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi;
//using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

// Đăng ký DbContext vào hệ thống
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection")));

// Khai báo dịch vụ xác thực Cookie
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.LoginPath = "/Account/Login";
        options.AccessDeniedPath = "/Account/AccessDenied";
    });

// ================= SWAGGER =================
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "CMS API",
        Version = "v1"
    });
});
// ===========================================
// 1. Khai báo chính sách CORS
builder.Services.AddCors(options => {
    options.AddPolicy("AllowAll", policy => {
        // Cho phép mọi nguồn (Origin), mọi phương thức (GET, POST...), mọi tiêu đề (Header)
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});
var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

// 2. Kích hoạt chính sách CORS đã khai báo ở trên
app.UseCors("AllowAll");

// THÊM DÒNG NÀY
app.UseAuthentication();
app.UseAuthorization();


// ================= SWAGGER =================
app.UseSwagger();

app.UseSwaggerUI(options =>
{
    options.SwaggerEndpoint("/swagger/v1/swagger.json", "CMS API V1");
});
// ===========================================

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();