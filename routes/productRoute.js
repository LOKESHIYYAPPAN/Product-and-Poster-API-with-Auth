const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { authenticate, authorize } = require('../middlewares/authenticate');

// Super Admin and Admin can add products
router.post('/', authenticate, authorize(['Super Admin', 'Admin']), productController.createProduct);

// All roles can view products
router.get('/list', authenticate, authorize(['Super Admin', 'Admin', 'User']), productController.listProducts);

module.exports = router;
