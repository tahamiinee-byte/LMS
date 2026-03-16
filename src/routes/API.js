const express = require('express')
const path = require("path")
const requireAuth = require('../middleware/middleware.js')


const router = express.Router();
const { getUserInfo , getStudentModule , getModuleAPI} = require(path.resolve(__dirname,'../controllers/APIcontroller.js'))


router.route('/users',requireAuth).get(getUserInfo)
router.route('/modules',requireAuth).get(getStudentModule)
router.route('/module/:module_name').get(getModuleAPI)

module.exports = router