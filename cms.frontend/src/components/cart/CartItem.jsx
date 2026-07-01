import { useState } from "react";
import CartManager from "../../utils/CartManager";

const API_URL = "https://localhost:7284";

const CartItem = ({ item, onCartChange }) => {
    const [quantity, setQuantity] = useState(item.quantity);

    const increaseQty = () => {
        const newQty = quantity + 1;
        setQuantity(newQty);

        CartManager.updateQuantity(
            item.id,
            newQty
        );

        onCartChange();
    };

    const decreaseQty = () => {
        if (quantity <= 1) return;

        const newQty = quantity - 1;

        setQuantity(newQty);

        CartManager.updateQuantity(
            item.id,
            newQty
        );

        onCartChange();
    };

    const removeItem = () => {
        CartManager.removeFromCart(item.id);

        onCartChange();
    };

    return (
        <div className="cart-item">
            <div className="cart-product">
                <img
                    src={`${API_URL}${item.imageUrl}`}
                    alt={item.name}
                />

                <div>
                    <h3>{item.name}</h3>

                    <button
                        className="remove-btn"
                        onClick={removeItem}
                    >
                        Xóa sản phẩm
                    </button>
                </div>
            </div>

            <div>
                {item.price.toLocaleString("vi-VN")}₫
            </div>

            <div className="qty-box">
                <button onClick={decreaseQty}>
                    -
                </button>

                <span>{quantity}</span>

                <button onClick={increaseQty}>
                    +
                </button>
            </div>

            <div className="total-price">
                {(
                    item.price * quantity
                ).toLocaleString("vi-VN")}
                ₫
            </div>
        </div>
    );
};

export default CartItem;