const express = require('express')
const path = require("path")
const app = express() 
const routes = require(path.resolve(__dirname,'routes/pages.js'))
const api_routes = require(path.resolve(__dirname,'routes/api.js'))
const file_routes = require(path.resolve(__dirname,'routes/files.js'))
const session = require('express-session')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(session({
    secret: 'ihfubgiubdu',
    resave: false,
    saveUninitialized: false,
}))

app.use('/',routes)
app.use('/api',api_routes)
app.use('/',file_routes)


module.exports = app 

