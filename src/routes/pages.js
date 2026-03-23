const express = require('express')
const path = require('path')
const router = express.Router()
const { CheckingLoginCredential} = require(path.resolve(__dirname,'../controllers/pages.js'))
const requireAuth = require('../middleware/middleware.js')

router.route('/').get((req,res)=>{
    res.sendFile(path.resolve(__dirname,'../../public/login.html'))
}).post(CheckingLoginCredential)

router.route('/dashboard').get(requireAuth , (req,res)=>{
    res.sendFile(path.resolve(__dirname,'../../public/dashboard.html'))
})

router.route('/modules/:name').get(requireAuth , (req,res)=>{
    res.sendFile(path.resolve(__dirname,'../../public/module.html'))
})

router.route('/modules/:name/:type').get(requireAuth , (req,res)=>{
    res.sendFile(path.resolve(__dirname,'../../public/module.html'))
})

module.exports = router 