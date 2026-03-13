const {Pool} = require('pg')
const path = require('path')
const {dbconfig} = require(path.resolve(__dirname,'config.js'))

const pool = new Pool(dbconfig)

pool.connect()
.then(()=>console.log('database connected'))
.catch(err=>console.error('this happened',err))

module.exports = pool
