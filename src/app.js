const express = require('express')
const path = require("path")
const app = express()
app.use(express.static(path.resolve(__dirname,'../public')))


app.use(express.json())
app.use(express.urlencoded({extended : false }))

app.post('/login' , (req , res)=>{
    console.log(req.body)
    
})
module.exports = app 

