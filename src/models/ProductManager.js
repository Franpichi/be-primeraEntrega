const fs = require('fs');

class ProductManager {
    constructor(filePath) {
        this.filePath = filePath;
        this.products = this.readProducts();
    }

    readProducts() {
        try {
            const data = fs.readFileSync(this.filePath, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    writeProducts() {
        fs.writeFileSync(this.filePath, JSON.stringify(this.products, null, 2), 'utf-8');
    }

    addProduct(product) {
        const newProduct = {
            ...product,
            id: (this.products.length + 1).toString(),
            status: true,
        };

        if (this.products.some((p) => p.code === newProduct.code)) {
            throw new Error('Producto con codigo existente');
        }

        const requiredFields = ['title', 'description', 'price', 'code', 'stock'];
        for (const field of requiredFields) {
            if (!newProduct[field]) {
                throw new Error(`Field "${field}" is required`);
            }
        }

        this.products.push(newProduct);
        this.writeProducts();
        return newProduct;
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find((p) => p.id === id);
        if (!product) {
            throw new Error('Product not found');
        }
        return product;
    }

    updateProduct(id, fields) {
        const index = this.products.findIndex((p) => p.id === id);
        if (index === -1) {
            throw new Error('Product not found');
        }

        fields.id = id;

        this.products[index] = { ...this.products[index], ...fields };
        this.writeProducts();
        return this.products[index];
    }

    deleteProduct(id) {
        const index = this.products.findIndex((p) => p.id === id);
        if (index === -1) {
            throw new Error('Product not found');
        }

        this.products.splice(index, 1);
        this.writeProducts();
        return true;
    }
}

module.exports = ProductManager;
