const express = require('express');
const router = express.Router();

module.exports = (productManager) => {

    router.get('/', (req, res) => {
        const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
        const products = limit ? productManager.getProducts().slice(0, limit) : productManager.getProducts();

        if (Array.isArray(products)) {
            res.json(products);
        } else {
            res.status(500).send('Internal Server Error');
        }
    });

    router.get('/:pid', (req, res) => {
        const productId = parseInt(req.params.pid);
        try {
            const product = productManager.getProductById(productId);
            res.json(product);
        } catch (error) {
            res.status(404).send(error.message);
        }
    });

    router.post('/', (req, res) => {
        try {
            const newProduct = req.body;
            const addedProduct = productManager.addProduct(newProduct);
            res.status(201).json(addedProduct);
        } catch (error) {
            res.status(400).send(error.message);
        }
    });

    router.put('/:pid', (req, res) => {
        const productId = parseInt(req.params.pid);
        const updatedFields = req.body;
        try {
            const updatedProduct = productManager.updateProduct(productId, updatedFields);
            res.json(updatedProduct);
        } catch (error) {
            res.status(404).send(error.message);
        }
    });

    router.delete('/:pid', (req, res) => {
        const productId = parseInt(req.params.pid);
        try {
            productManager.deleteProduct(productId);
            res.send('Producto eliminado correctamente');
        } catch (error) {
            res.status(404).send(error.message);
        }
    });

    return router;
};
