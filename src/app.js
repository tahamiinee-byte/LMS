const express = require('express')
const path = require("path")
const app = express()

app.use(express.static(path.resolve(__dirname,'../public')))

app.use(express.json())
app.use(express.urlencoded({extended : false }))

const loginRoute = require(path.resolve(__dirname , "./routes/routes.js"))

app.use('/login' ,loginRoute);

module.exports = app 

