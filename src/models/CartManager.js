const fs = require('fs');

class CartManager {
    constructor(filePath) {
        this.filePath = filePath;
        this.carts = this.readCarts();
    }

    readCarts() {
        try {
            const data = fs.readFileSync(this.filePath, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    writeCarts() {
        fs.writeFileSync(this.filePath, JSON.stringify(this.carts, null, 2), 'utf-8');
    }

    createCart() {
        const newCart = {
            id: this.generateCartId(),
            products: [],
        };
        this.carts.push(newCart);
        this.writeCarts();
        return newCart;
    }

    getCartById(cartId) {
        const cart = this.carts.find((c) => c.id === cartId);
        if (!cart) {
            throw new Error('Cart not found');
        }
        return cart;
    }

    generateCartId() {
        return (this.carts.length + 1).toString();
    }

    addProductToCart(cartId, productId, quantity) {
        const cart = this.getCartById(cartId);

        const existingProduct = cart.products.find((p) => p.id === productId);

        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            cart.products.push({
                id: productId,
                quantity: quantity,
            });
        }

        this.writeCarts();
    }
}

module.exports = CartManager;
