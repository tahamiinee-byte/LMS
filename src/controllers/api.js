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
    console.log('hi', req.session.UserID, req.session.Type)
    if (req.session.Type === 'student') {
        const semester = await pool.query('select semester from student where id = $1', [req.session.UserID]);
        console.log(semester.rows[0].semester)

        const result = await pool.query(
            'select module_name from (module_semester ms join module m on ms.module_id = m.module_id ) where ms.semester = $1',
            [semester.rows[0].semester]
        );
        console.log(result.rows)
        res.status(200).json(result.rows);
    }
    else if (req.session.Type === 'Teacher') console.log('Not set yet')
}

module.exports = {getUserInfo , getUserModules}