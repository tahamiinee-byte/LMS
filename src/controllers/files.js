const path = require('path')
const {pool} = require(path.resolve(__dirname,'../config/dbcon.js'))

const seeFile = async (req,res) => {
    const {name , type , filename } = req.params

    const result = await pool.query(`
        select filepath from resources r
        join module m 
        on r.module_id = m.module_id 
        where m.module_name = $1 
        and r.type = $2 
        and r.title = $3
    `, [name, type, filename])

    if (!result.rowCount) {
        return res.sendStatus(404)
    }

    const filepath = path.resolve(result.rows[0].filepath)
    res.sendFile(filepath)
}

const downloadFile = async (req,res) => {
    const { name, type, filename } = req.params

    const result = await pool.query(`
        select filepath from resources r
        join module m 
        on r.module_id = m.module_id 
        where m.module_name = $1 
        and r.type = $2 
        and r.title = $3
    `,[name , type , filename])

    if (!result.rowCount) {
        return res.sendStatus(404)
    }
    
    const filepath = path.resolve(result.rows[0].filepath)
    res.download(filepath)
}

module.exports = {seeFile , downloadFile}