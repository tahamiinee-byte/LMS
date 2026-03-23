const express = require('express')
const router = express.Router()
const path = require('path')
const requireAuth = require('../middleware/middleware.js')
const {seeFile , downloadFile} = require('../controllers/files.js')

router.route('/modules/:name/:type/:filename/see').get(requireAuth,seeFile)
router.route('/modules/:name/:type/:filename/download').get(requireAuth,downloadFile)

module.exports = router
