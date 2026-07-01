import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import productService from '../../services/productService';
import CartManager from "../../utils/CartManager";

function Checkout() { 
    const navigate = useNavigate();
    const [cart, setCart] = useState(CartManager.getCart());


    // A. LUỒNG BẢO MẬT CHẶN TRUY CẬP TRỘM: Kiểm tra phiên làm việc sống trong ổ cứng trình duyệt
    const customerString = localStorage.getItem('customer');
    const customer = customerString ? JSON.parse(customerString) : null;


    const [shippingForm, setShippingForm] = useState({ phone: '', address: '', notes: '' });
    const formatVND = (money) => {
        return money.toLocaleString("vi-VN") + " ₫";
    };

    useEffect(() => {
        // Cưỡng chế đá văng người dùng về lại trang login nếu chưa đăng nhập định danh
        if (!customer) {
            alert("⛔ QUYỀN TRUY CẬP BỊ TỪ CHỐI: Vui lòng đăng nhập tài khoản Khách hàng trước khi thanh toán đơn hàng!");
            navigate('/login');
            return;
        }


        // B. LOGIC TỰ ĐỘNG ĐIỀN (AUTO-FILL): Lấy SĐT và Địa chỉ đăng ký từ tài khoản Customer đổ thẳng vào Form
        setShippingForm({
            phone: customer.phone || '',
            address: customer.address || '',
            notes: ''
        });
    }, []);


    const handleInputChange = (e) => {
        setShippingForm({ ...shippingForm, [e.target.name]: e.target.value });
    };


    const totalOrderPrice = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );


    // C. LUỒNG ĐÓNG GÓI VÀ POST ĐƠN HÀNG ĐẨY XUỐNG C# SQL SERVER
    const handleConfirmCheckout = async (e) => {
        e.preventDefault();


        if (cart.length === 0) {
            alert("⛔ LỖI HỆ THỐNG: Giỏ hàng đang trống rỗng, không thể tạo đơn đặt hàng!");
            return;
        }


        // Đóng gói mảng dữ liệu khớp 100% với cấu trúc lớp OrderInputDto bên Backend C#
        const orderPayload = {
            customerId: customer.id,
            notes: shippingForm.notes,
            orderDetails: cart.map(item => ({
                productId: item.id,
                quantity: item.quantity,
                unitPrice: item.price // ĐỔI TÊN THÀNH unitPrice khớp chuẩn cấu trúc trường của thầy
            }))
        };


        try {
            // Thực hiện đẩy gói tin mạng POST ngầm gửi xuống Web API máy chủ
            await productService.checkoutOrder(orderPayload);


            alert("🎉 ĐẶT HÀNG THÀNH CÔNG RỰC RỠ! Đơn hàng đã được chốt và tự động trừ bớt tồn kho trong SQL Server!");


            localStorage.removeItem("cart");

            // cập nhật badge trên header
            window.dispatchEvent(new Event("cartUpdated"));

            setCart([]);

            navigate("/my-orders");
        } catch (error) {
            alert("⛔ GIAO DỊCH THẤT BẠI: Số lượng đặt mua vượt quá hàng tồn kho vật lý hiện có của shop hoặc lỗi máy chủ!");
        }
    };


    if (!customer) return null; // Giữ màn hình sạch trong lúc React thực thi lệnh điều hướng lùi về login


    return (
      
        <div className="checkout-page bg-light min-vh-100 d-flex flex-column">
            {/*<Header cart={cart} />*/}
            <div className="container my-4 flex-grow-1">
                <div className="row">
                    {/* KHỐI TRÁI (6/12): Form thông tin giao nhận hàng hóa đã Auto-fill */}
                    <div className="col-md-6 mb-4">
                        <div className="card border-0 shadow-sm p-4 bg-white" style={{ borderRadius: '12px' }}>
                            <h5 className="font-weight-bold mb-4" style={{ color: '#005088' }}>
                                <i className="fas fa-shipping-fast mr-2"></i>Địa Chỉ Nhận Hàng Thành Viên
                            </h5>
                            <form onSubmit={handleConfirmCheckout}>
                                <div className="form-group mb-3">
                                    <label className="small font-weight-bold text-secondary">Tên Chủ Tài Khoản Đặt Đơn</label>
                                    <input type="text" className="form-control bg-light font-weight-bold" value={customer.fullName} readOnly />
                                </div>
                                <div className="form-group mb-3">
                                    <label className="small font-weight-bold text-secondary">Số Điện Thoại Nhận Hàng *</label>
                                    <input type="text" name="phone" className="form-control font-weight-bold" value={shippingForm.phone} onChange={handleInputChange} required />
                                </div>
                                <div className="form-group mb-3">
                                    <label className="small font-weight-bold text-secondary">Địa Chỉ Nhận Hàng Thực Tế *</label>
                                    <textarea name="address" className="form-control font-weight-bold" rows="2" value={shippingForm.address} onChange={handleInputChange} required></textarea>
                                </div>
                                <div className="form-group mb-4">
                                    <label className="small font-weight-bold text-secondary">Ghi Chú Đơn Hàng (Notes)</label>
                                    <input type="text" name="notes" className="form-control" value={shippingForm.notes} onChange={handleInputChange} placeholder="Ví dụ: Giao giờ hành chính, gọi trước khi đến..." />
                                </div>
                                <button type="submit" className="btn btn-success btn-block py-2 font-weight-bold shadow-sm" style={{ borderRadius: '8px', backgroundColor: '#11CAA0', borderColor: '#11CAA0' }}>
                                    <i className="fas fa-check-circle mr-1"></i> XÁC NHẬN ĐẶT HÀNG NGAY
                                </button>
                            </form>
                        </div>
                    </div>


                    {/* KHỐI PHẢI (6/12): Kiểm tra tóm tắt mảng giỏ hàng con */}
                    <div className="col-md-6">
                        <div className="card border-0 shadow-sm p-4 bg-white" style={{ borderRadius: '12px' }}>
                            <h5 className="font-weight-bold mb-3 text-dark">Kiểm Tra Đơn Hàng ({cart.length})</h5>
                            <div className="checkout-items-list mb-3 border-bottom pb-2" style={{ maxHeight: '250px', overflowY: 'auto' }}>
                                {cart.map(item => (
                                    <div className="d-flex justify-content-between align-items-center mb-3 small" key={item.id}>
                                        <span className="text-secondary font-weight-bold">{item.name} <strong className="text-primary">x{item.quantity}</strong></span>
                                        <span className="text-dark font-weight-bold">{formatVND(item.price * item.quantity)}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="d-flex justify-content-between align-items-center font-weight-bold">
                                <span className="text-dark">TỔNG TIỀN THANH TOÁN:</span>
                                <h3 className="text-danger font-weight-bold m-0">{formatVND(totalOrderPrice)}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         
        </div>
    );
}


export default Checkout;
