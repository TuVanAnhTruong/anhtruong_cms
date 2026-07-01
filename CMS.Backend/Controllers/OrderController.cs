using CMS.Backend.Services;
using CMS.Data;
using CMS.Data.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CMS.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly EmailService _emailService;

        public OrderController(
            ApplicationDbContext context,
            EmailService emailService)
        {
            _context = context;
            _emailService = emailService;
        }

        //=========================================================
        // TẠO ĐƠN HÀNG
        //=========================================================
        [HttpPost]
        public async Task<IActionResult> CreateOrder([FromBody] OrderInputDto dto)
        {
            if (dto == null || dto.OrderDetails == null || dto.OrderDetails.Count == 0)
            {
                return BadRequest(new
                {
                    message = "Giỏ hàng đang trống!"
                });
            }

            using var transaction = await _context.Database.BeginTransactionAsync();

            Order newOrder;

            try
            {
                //==========================
                // Tạo Order
                //==========================
                newOrder = new Order
                {
                    CustomerId = dto.CustomerId,
                    OrderDate = DateTime.Now,
                    Status = 0,
                    Notes = dto.Notes
                };

                _context.Orders.Add(newOrder);

                await _context.SaveChangesAsync();

                //==========================
                // Kiểm tra tồn kho
                //==========================
                foreach (var item in dto.OrderDetails)
                {
                    var product = await _context.Products
                        .FirstOrDefaultAsync(x => x.Id == item.ProductId);

                    if (product == null)
                    {
                        await transaction.RollbackAsync();

                        return NotFound(new
                        {
                            message = $"Không tìm thấy sản phẩm {item.ProductId}"
                        });
                    }

                    if (product.StockQuantity < item.Quantity)
                    {
                        await transaction.RollbackAsync();

                        return BadRequest(new
                        {
                            message = $"Sản phẩm {product.Name} chỉ còn {product.StockQuantity} sản phẩm."
                        });
                    }

                    // Trừ kho
                    product.StockQuantity -= item.Quantity;

                    // Chi tiết đơn hàng
                    _context.OrderDetails.Add(new OrderDetail
                    {
                        OrderId = newOrder.Id,
                        ProductId = item.ProductId,
                        Quantity = item.Quantity,
                        UnitPrice = item.UnitPrice
                    });
                }

                await _context.SaveChangesAsync();

                await transaction.CommitAsync();
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();

                return StatusCode(500, new
                {
                    message = ex.Message
                });
            }

            //----------------------------------------------------
            // Gửi email (không ảnh hưởng đến việc lưu đơn)
            //----------------------------------------------------
            try
            {
                var customer = await _context.Customers
                    .FirstOrDefaultAsync(x => x.Id == dto.CustomerId);

                if (customer == null)
                {
                    Console.WriteLine("Không tìm thấy khách hàng.");
                }
                else if (string.IsNullOrWhiteSpace(customer.Email))
                {
                    Console.WriteLine("Khách hàng chưa có Email.");
                }
                else
                {
                    decimal total = dto.OrderDetails.Sum(x =>
                        x.Quantity * x.UnitPrice);

                    Console.WriteLine("====================================");
                    Console.WriteLine($"Bắt đầu gửi mail...");
                    Console.WriteLine($"Người nhận : {customer.Email}");
                    Console.WriteLine($"Tên KH     : {customer.FullName}");
                    Console.WriteLine($"Mã đơn     : {newOrder.Id}");
                    Console.WriteLine($"Tổng tiền  : {total}");
                    Console.WriteLine("====================================");

                    await _emailService.SendOrderEmail(
                        customer.Email,
                        customer.FullName,
                        newOrder.Id,
                        total);

                    Console.WriteLine("ĐÃ GỬI EMAIL THÀNH CÔNG");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("===== LỖI GỬI EMAIL =====");
                Console.WriteLine(ex.ToString());
                Console.WriteLine("=========================");
            }

            return StatusCode(201, new
            {
                message = "Đặt hàng thành công!",
                orderId = newOrder.Id
            });
        }

        //=========================================================
        // LẤY ĐƠN HÀNG CỦA KHÁCH
        //=========================================================
        [HttpGet("customer/{customerId}")]
        public async Task<IActionResult> GetOrdersByCustomer(int customerId)
        {
            try
            {
                var orders = await _context.Orders
                    .Where(o => o.CustomerId == customerId)
                    .OrderByDescending(o => o.Id)
                    .Select(o => new
                    {
                        id = o.Id,
                        orderDate = o.OrderDate,
                        status = o.Status,
                        notes = o.Notes,
                        totalAmount = o.OrderDetails.Sum(d => d.Quantity * d.UnitPrice)
                    })
                    .ToListAsync();

                return Ok(orders);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

    }

    //=========================================================
    // DTO
    //=========================================================

    public class OrderInputDto
    {
        public int CustomerId { get; set; }

        public string? Notes { get; set; }

        public List<OrderDetailInputDto> OrderDetails { get; set; } = new();
    }

    public class OrderDetailInputDto
    {
        public int ProductId { get; set; }

        public int Quantity { get; set; }

        public decimal UnitPrice { get; set; }
    }
}