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

const loginRoute = require(path.resolve(__dirname , "./routes/routes.js"))

app.use('/login' ,loginRoute);

module.exports = app 

