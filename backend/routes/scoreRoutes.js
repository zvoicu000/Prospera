const express = require('express')
const router = express.Router()
const scoreController = require('../controllers/scoreController')
const checkAuth = require('../middleware/checkAuth')

router.get('/leaderboard', scoreController.getLeaderboard)

router.get('/:userid', checkAuth, scoreController.getUserScore)

router.post('/update_score', checkAuth, scoreController.updateScore);

module.exports = router; 