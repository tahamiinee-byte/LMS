const express = require("express")
const router = express.Router();
const CheckingLoginCredential = require('../controllers/loginController.js')


router.route('/').post(CheckingLoginCredential)

module.exports = router