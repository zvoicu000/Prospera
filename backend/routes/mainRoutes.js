const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');
const checkAuth = require('../middleware/checkAuth');

router.get('/', checkAuth, mainController.welcome)

router.get('/health', checkAuth, mainController.healthCheck)

module.exports = router