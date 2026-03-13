const express = require('express')
const path = require('path')
const router = express.Router()
const {getUserInfo} = require(path.resolve(__dirname,'../controllers/most.js'))

router.route('/').get((req,res)=>{
    res.sendFile(path.resolve(__dirname,'../../public/login.html'))
})

router.route('/student_interface').get((req,res)=>{
    res.sendFile(path.resolve(__dirname,'../../public/dashboard.html'))
})

router.route('api/users',getUserInfo)


module.exports = router 