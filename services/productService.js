const productDao = require('../dao/productDAO');

async function createProduct(name, description, price, userId) {
    return await productDao.createProduct(name, description, price, userId);
}

async function listProducts(role, userId) {
    if (role === 'Super Admin') return await productDao.findAll();
    if (role === 'Admin') return await productDao.findByUser(userId);
    return await productDao.findAll();
}

module.exports = { createProduct, listProducts };
