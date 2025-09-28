const productService = require('../services/productService');

async function createProduct(req, res) {
    try {
        const { name, description, price } = req.body;
        if (!name || !price) return res.status(400).json({ error: 'Name and price are required' });

        const product = await productService.createProduct(name, description, price, req.user.id);
        res.status(201).json({ product });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

async function listProducts(req, res) {
    try {
        const products = await productService.listProducts(req.user.role, req.user.id);
        res.json({ products });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = { createProduct, listProducts };
