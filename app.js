const express = require('express');
const path = require('path');
const ProductManager = require('./src/models/ProductManager');
const CartManager = require('./src/models/CartManager');

const app = express();
const productManager = new ProductManager(path.join(__dirname, './src/data/products.json'));
const cartManager = new CartManager(path.join(__dirname, './src/data/carts.json'));

app.use(express.json());

const productRouter = require('./src/routes/productRouter')(productManager);
app.use('/api/products', productRouter);

const cartRouter = require('./src/routes/cartRouter')(cartManager);
app.use('/api/carts', cartRouter);

app.get('/', (req, res) => {
    res.send('¡Bienvenido a mi aplicación!');
});

const port = 8080;
app.listen(port, () => {
    console.log(`Servidor Express escuchando en el puerto ${port}`);
});

module.exports = app;
