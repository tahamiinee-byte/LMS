const {pool} = require('pg')
const {dbconfig} = require(path.resolve(__dirname,'config.js'))

const pool = new pool(dbconfig)

pool.connect()
.then(()=>console.log('database connected'))
.catch(err=>console.error('this happened',err))

module.exports = pool
