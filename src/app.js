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

const Auth = require(path.resolve(__dirname , "./routes/auth.js"))
const API = require(path.resolve(__dirname , "./routes/API.js"))
const Module = require(path.resolve(__dirname , "./routes/module.js"))


app.use('/' ,Auth);
app.use('/api', API)
app.use('/module', Module)
module.exports = app 

