const express = require('express')
const router = express.Router()
const path = require('path')
const {getUserInfo , getUserModules} = require(path.resolve(__dirname,'../controllers/api.js'))
const requireAuth = require('../middleware/middleware.js')


router.route('/users', requireAuth).get(getUserInfo)
router.route('/modules', requireAuth).get(getUserModules)


module.exports = router