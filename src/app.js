const express = require('express')
const path = require("path")
const app = express() 
const routes = require(path.resolve(__dirname,'routes/most.js'))

//app.use(express.static(path.resolve(__dirname,'../public')))
app.use('/',routes)

app.use(express.urlencoded({extended : true }))

module.exports = app 

