const express = require("express")
const router = express.Router();
const requireAuth = require('../middleware/middleware.js')
const {CheckingLoginCredential, GetHomePage} = require('../controllers/loginController.js')

router.route('/login').post(CheckingLoginCredential)
router.get('/home',requireAuth,GetHomePage)

module.exports = router