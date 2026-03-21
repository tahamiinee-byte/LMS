const express = require('express')
const requireAuth = require('../middleware/middleware.js')
const router = express.Router();

const getUserInfo = require('../controllers/APIcontroller.js')
const {getModuleData,SeeData} = require('../controllers/module.js')

router.use(requireAuth)


router.get('/users',getUserInfo)
router.get('/modules/:module_name/:type/:fileName/See',SeeData)
router.get('/modules/:module_name/:type',getModuleData)

module.exports = router