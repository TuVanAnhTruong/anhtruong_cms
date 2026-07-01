import { useEffect, useState } from "react";
import CartItem from "./CartItem";
import CartManager from "../../utils/CartManager";
const CartList = ({ onCartChange }) => {
    const [cartItems, setCartItems] = useState([]);

    const loadCart = () => {
        setCartItems(
            CartManager.getCart()
        );
    };

    useEffect(() => {
        loadCart();
    }, []);

    const handleChange = () => {
        loadCart();

        if (onCartChange) {
            onCartChange();
        }
    };

    return (
        <>
            {cartItems.length === 0 ? (
                <h4>Giỏ hàng trống</h4>
            ) : (
                cartItems.map(item => (
                    <CartItem
                        key={item.id}
                        item={item}
                        onCartChange={handleChange}
                    />
                ))
            )}
        </>
    );
};

export default CartList;