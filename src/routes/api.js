const express = require('express')
const router = express.Router()
const path = require('path')
const {getUserInfo , getUserModules , getFiles} = require(path.resolve(__dirname,'../controllers/api.js'))
const requireAuth = require('../middleware/middleware.js')


router.route('/users').get(requireAuth , getUserInfo)
router.route('/modules').get(requireAuth ,getUserModules)
router.route('/modules/:name/:type').get(requireAuth , getFiles)


module.exports = router