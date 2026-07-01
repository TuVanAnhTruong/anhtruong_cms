class CartManager {
    static getCart() {
        return JSON.parse(localStorage.getItem("cart")) || [];
    }

    static addToCart(product, quantity = 1) {
        const cart = this.getCart();

        const existingItem = cart.find(
            item => item.id === product.id
        );

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({
                ...product,
                quantity
            });
        }

        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );
        window.dispatchEvent(new Event("cartUpdated"));
    }

    static removeFromCart(id) {
        const cart = this.getCart().filter(
            item => item.id !== id
        );

        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );

        window.dispatchEvent(new Event("cartUpdated"));
    }

    static updateQuantity(id, quantity) {
        const cart = this.getCart();

        const item = cart.find(
            x => x.id === id
        );

        if (item) {
            item.quantity = quantity;
        }

        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );

        window.dispatchEvent(new Event("cartUpdated"));
    }
}

export default CartManager;