const express = require("express")
const router = express.Router();
const {CheckingLoginCredential,GetDashboardPage} = require('../controllers/loginController.js')


router.route('/').post(CheckingLoginCredential)
router.route('/dashboard').get(GetDashboardPage)

module.exports = router