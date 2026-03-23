const express = require('express')
const path = require('path')
const router = express.Router()
const { CheckingLoginCredential} = require(path.resolve(__dirname,'../controllers/pages.js'))
const requireAuth = require('../middleware/middleware.js')

const template = (req, res) => {
    const Type = req.session.Type
    if (Type === 'student') {
        res.sendFile(path.resolve(__dirname, '../../public/module.html'));
    }
    else if (Type === 'professor') {
        res.sendFile(path.resolve(__dirname, '../../public/teacherModule.html'))
    }
}


router.route('/').get((req,res)=>{
    res.sendFile(path.resolve(__dirname,'../../public/login.html'))
}).post(CheckingLoginCredential)

router.route('/dashboard').get(requireAuth , (req,res)=>{
    res.sendFile(path.resolve(__dirname,'../../public/dashboard.html'))
})

router.route('/modules/:name').get(requireAuth,template)

router.route('/modules/:name/:type').get(requireAuth,template)

module.exports = router 