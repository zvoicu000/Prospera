const express = require('express');
const router = express.Router();
const tavilyController = require('../controllers/tavilyController');
const { route } = require('./mainRoutes');
const checkAuth = require('../middleware/checkAuth');

router.post('/search', checkAuth, tavilyController.tavilySearch);

router.post('/extract', checkAuth, tavilyController.extractTavilyData);

router.post('/crawl', checkAuth, tavilyController.tavilyCrawl);

module.exports = router;