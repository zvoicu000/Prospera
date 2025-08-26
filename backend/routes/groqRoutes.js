const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');
const groqController = require('../controllers/groqController');

router.post('/analyze', checkAuth, groqController.callGroq);
router.post('/keep-relevant', checkAuth, groqController.keepRelevantText);

module.exports = router;