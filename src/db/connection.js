const {Pool} = require('pg')
const {dbconfig} =require('../config/config.js')

const pool = new Pool(dbconfig)
const query = async (text, params) =>{
    try{
        return await pool.query(text,params)
    }catch(err){
        console.error("Database query ERROR" , err)
        throw err;
    } 
}
module.exports = query