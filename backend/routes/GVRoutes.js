const express = require('express')
const router = express.Router()
const GVcontroller = require('../controllers/GVcontroller')
const checkAuth = require('../middleware/checkAuth')

router.post('/identify-brand', checkAuth,
    GVcontroller.uploadMiddleware,
    GVcontroller.identifyBrand
)

router.post('/test-upload', checkAuth, GVcontroller.uploadMiddleware,GVcontroller.testImageUpload)

module.exports = router