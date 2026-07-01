import { useState } from "react";
import CartList from "../../components/cart/CartList";
import CartSummary from "../../components/cart/CartSummary";
import VoucherBox from "../../components/cart/VoucherBox";
import "./cart.css";

const CartPage = () => {
    const [refresh, setRefresh] = useState(false);

    const reloadCart = () => {
        setRefresh(!refresh);
    };

    return (
        <main className="cart-page">
            <div className="cart-header">
                <h1>Giỏ hàng của bạn</h1>
            </div>

            <div className="cart-layout">
                <div className="cart-left">
                    <CartList
                        onCartChange={reloadCart}
                    />

                    <VoucherBox />
                </div>

                <div className="cart-right">
                    <CartSummary
                        key={refresh}
                    />
                </div>
            </div>
        </main>
    );
};

export default CartPage;