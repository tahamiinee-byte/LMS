const express = require('express')
const router = express.Router()
const path = require('path')
const {getUserInfo , getUserModules , getModule} = require(path.resolve(__dirname,'../controllers/api.js'))
const requireAuth = require('../middleware/middleware.js')


router.route('/users', requireAuth).get(getUserInfo)
router.route('/modules', requireAuth).get(getUserModules)
router.route('/modules/:name',requireAuth).get(getModule)


module.exports = router