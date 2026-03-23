const path = require('path')
const {pool} = require(path.resolve(__dirname,'../config/dbcon.js'))

const getUserInfo = async (req, res) => {
    const result = await pool.query(
        'select firstname,lastname from person where id = $1',
        [req.session.UserID]
    )
    const user = result.rows[0]
    res.status(200).json(user)
}

const getUserModules = async (req, res) => {
    if (req.session.Type === 'student') {
        const semester = await pool.query('select semester from student where id = $1', [req.session.UserID]);
        const result = await pool.query(
            'select module_name from (module_semester ms join module m on ms.module_id = m.module_id ) where ms.semester = $1',
            [semester.rows[0].semester]
        )
        res.status(200).json(result.rows);
    }
    else if (req.session.Type === 'professor'){
        const result = await pool.query(`
            select m.module_name 
            from module m join teacher_group_module tgm
            on m.module_id = tgm.module_id
            where tgm.id = $1     
        `,[req.session.UserID])
        res.status(200).json(result.rows)
    }
}

const getFiles = async (req,res) => {
    const {name , type} = req.params

    const result = await pool.query(`
        select title from 
        resources r join module m
        on r.module_id = m.module_id
        where m.module_name = $1 
        and r.type = $2
    ` , [name,type])

    if(!result.rowCount){
        return res.sendStatus(404)
    }

    res.json(result.rows.map(r=>r.title))
}

const SubmitFiles = async (req,res)=>{
    



}

module.exports = { getUserInfo, getUserModules, getFiles, SubmitFiles }