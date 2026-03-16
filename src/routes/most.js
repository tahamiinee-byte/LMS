const express = require('express')
const path = require('path')
const router = express.Router()
const { CheckingLoginCredential } = require(path.resolve(__dirname,'../controllers/most.js'))
const requireAuth = require('../middleware/middleware.js')

router.route('/').get((req,res)=>{
    res.sendFile(path.resolve(__dirname,'../../public/login.html'))
}).post(CheckingLoginCredential)

router.route('/dashboard',requireAuth).get((req,res)=>{
    res.sendFile(path.resolve(__dirname,'../../public/dashboard.html'))
})


module.exports = router 