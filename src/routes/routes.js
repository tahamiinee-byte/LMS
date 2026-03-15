const express = require("express")
const router = express.Router();
const requireAuth = require('../middleware/middleware.js')
const {CheckingLoginCredential, GetDashboardPage} = require('../controllers/loginController.js')

router.route('/login').post(CheckingLoginCredential)
router.get('/dashboard',requireAuth,GetDashboardPage)

module.exports = router