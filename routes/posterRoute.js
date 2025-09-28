const express = require('express');
const router = express.Router();
const posterController = require('../controllers/posterController');
const { authenticate, authorize } = require('../middlewares/authenticate');

// Super Admin & Admin can create posters
router.post('/', authenticate, authorize(['Super Admin', 'Admin']), posterController.createPoster);

// All roles can list posters
router.get('/', authenticate, authorize(['Super Admin', 'Admin', 'User']), posterController.listPosters);

module.exports = router;
