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
        );
        res.status(200).json(result.rows);
    }
    else if (req.session.Type === 'Teacher') console.log('Not set yet')
}

const getModule = (req,res) => {
    const Name = req.params.name
    res.redirect(`/modules/${Name}`)
}

module.exports = {getUserInfo , getUserModules , getModule}