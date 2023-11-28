const express = require('express');
const router = express.Router();

module.exports = (cartManager) => {

    router.post('/', (req, res) => {
        try {
            const newCart = cartManager.createCart();
            res.status(201).json(newCart);
        } catch (error) {
            res.status(500).send(error.message);
        }
    });

    router.get('/:cid', (req, res) => {
        const cartId = req.params.cid;
        try {
            const cart = cartManager.getCartById(cartId);
            res.json(cart);
        } catch (error) {
            res.status(404).send(error.message);
        }
    });

    router.post('/:cid/product/:pid', (req, res) => {
        const cartId = req.params.cid;
        const productId = parseInt(req.params.pid);
        const quantity = req.body.quantity || 1;

        try {
            cartManager.addProductToCart(cartId, productId, quantity);
            res.send('Producto agregado correctamente');
        } catch (error) {
            res.status(400).send(error.message);
        }
    });

    return router;
};
