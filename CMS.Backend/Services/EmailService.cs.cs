using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;

namespace CMS.Backend.Services
{
    public class EmailService
    {
        private readonly IConfiguration _configuration;

        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task SendOrderEmail(
            string toEmail,
            string customerName,
            int orderId,
            decimal total)
        {
            var email = new MimeMessage();

            email.From.Add(new MailboxAddress(
                "Aura Luxury Optics",
                _configuration["EmailSettings:Email"]));

            email.To.Add(MailboxAddress.Parse(toEmail));

            email.Subject = $"Xác nhận đơn hàng #{orderId}";

            email.Body = new TextPart("html")
            {
                Text = $@"
                    <h2>Xin chào {customerName}</h2>

                    <p>Cảm ơn bạn đã mua hàng tại <b>Aura Luxury Optics</b>.</p>

                    <p><b>Mã đơn hàng:</b> #{orderId}</p>

                    <p><b>Tổng tiền:</b> {total:N0} VNĐ</p>

                    <p>Đơn hàng của bạn đã được tiếp nhận và sẽ được xử lý trong thời gian sớm nhất.</p>

                    <br/>

                    <p>Trân trọng,</p>
                    <b>Aura Luxury Optics</b>
                "
            };

            using var smtp = new SmtpClient();

            try
            {
                Console.WriteLine("==================================");
                Console.WriteLine("Bắt đầu gửi Email...");
                Console.WriteLine($"To: {toEmail}");

                // Kết nối SMTP
                await smtp.ConnectAsync(
                    _configuration["EmailSettings:Host"],
                    int.Parse(_configuration["EmailSettings:Port"]),
                    SecureSocketOptions.StartTls);

                Console.WriteLine("Đã kết nối SMTP.");

                // Đăng nhập Gmail
                await smtp.AuthenticateAsync(
                    _configuration["EmailSettings:Email"],
                    _configuration["EmailSettings:Password"]);

                Console.WriteLine("Đăng nhập Gmail thành công.");

                // Gửi Email
                await smtp.SendAsync(email);

                Console.WriteLine("SendAsync thành công.");

                // Ngắt kết nối
                await smtp.DisconnectAsync(true);

                Console.WriteLine("Đã Disconnect.");
                Console.WriteLine("===== GỬI EMAIL THÀNH CÔNG =====");
                Console.WriteLine("==================================");
            }
            catch (Exception ex)
            {
                Console.WriteLine("==================================");
                Console.WriteLine("LỖI GỬI EMAIL");
                Console.WriteLine(ex.Message);
                Console.WriteLine(ex.ToString());
                Console.WriteLine("==================================");

                throw;
            }
        }
    }
}