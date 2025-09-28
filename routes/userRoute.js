const express = require('express');
const router = express.Router();
const authController = require('../controllers/userController');
const { authenticate, authorize } = require('../middlewares/authenticate');

router.post('/signup', authController.signup);
router.post('/signin', authController.signin);
router.get('/profile', authenticate, authController.profile);
router.get('/lists', authenticate, authorize(['Super Admin']), authController.listUsers);

module.exports = router;
