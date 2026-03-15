const express = require('express')
const session = require('express-session')
const path = require("path")
const app = express()
const {sessionConfig} = require('./config/config.js')


app.use(express.static(path.resolve(__dirname,'../public')))

app.use(express.json())
app.use(express.urlencoded({extended : false }))
 
app.use(session({
    secret : sessionConfig.secret,
    resave : false ,
    saveUninitialized :false 
}))

const root = require(path.resolve(__dirname , "./routes/routes.js"))
const API = require(path.resolve(__dirname , "./routes/API.js"))

app.use('/' ,root);
app.use('/api', API)
module.exports = app 

