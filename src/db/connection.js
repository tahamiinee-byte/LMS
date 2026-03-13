const path = require("path")
const {dbconfig} = require(path.resolve(__dirname ,"../config/config.js" ))
const {Pool} =require("pg")

const pool = new Pool(dbconfig)
module.exports = pool 