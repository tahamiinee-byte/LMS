const express = require("express")
const path = require("path")

const router = express.Router();
const requireAuth = require('../middleware/middleware.js')
const {CheckingLoginCredential, GetHomePage} = require('../controllers/loginController.js')


router.route('/login').post(CheckingLoginCredential)
router.get('/home',requireAuth,GetHomePage)


router.get('/module/:module_name',requireAuth,(req,res) => {
    res.sendFile(path.resolve(__dirname,'../../public/modules.html'))
    }
)

module.exports = router