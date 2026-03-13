const express = require('express')
const path = require("path")
const app = express() 
const routes = require(path.resolve(__dirname,'routes/most.js'))
const session = require('express-session')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(session({
    secret: 'ihfubgiubdu',
    resave: false,
    saveUninitialyzed: false,
}))

app.use('/',routes)
app.use('/student_interface',routes)
app.use('api/users',routes)

module.exports = app 

