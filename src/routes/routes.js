const express = require("express")
const router = express.Router();
const CheckingLoginCredential = require('../controllers/loginController.js')


router.route('/login').post(CheckingLoginCredential)
//router.route('/dashboard').get(GetDashboardPage)

module.exports = router