import { useEffect, useState } from "react";
import CartManager from "../../utils/CartManager";
import { Link } from 'react-router-dom';

const CartSummary = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        setCartItems(
            CartManager.getCart()
        );
    }, []);

    const subtotal = cartItems.reduce(
        (sum, item) =>
            sum + item.price * item.quantity,
        0
    );

    const vat = subtotal * 0.08;

    const total = subtotal + vat;

    return (
        <div className="cart-summary">
            <h2>Tạm tính</h2>

            <div className="summary-row">
                <span>Giá trị sản phẩm</span>

                <span>
                    {subtotal.toLocaleString("vi-VN")}₫
                </span>
            </div>

            <div className="summary-row">
                <span>Phí vận chuyển</span>

                <span>Miễn phí</span>
            </div>

            <div className="summary-row">
                <span>VAT (8%)</span>

                <span>
                    {vat.toLocaleString("vi-VN")}₫
                </span>
            </div>

            <hr />

            <div className="summary-total">
                <span>Tổng cộng</span>

                <span>
                    {total.toLocaleString("vi-VN")}₫
                </span>
            </div>
            <Link
                to="/checkout"
                className="checkout-btn text-decoration-none d-inline-block text-center"
            >
                Tiến hành thanh toán
            </Link>
        </div>
    );
};

export default CartSummary;