const query = require("../db/connection.js");


const getUserInfo = async (req,res)=>{
    const result = await query(
        'select firstname,lastname from person where id = $1',
        [req.session.UserID]
    )
    const user = result.rows[0]

    if (req.session.Type === 'student'){
        const semester = await query('select semester from student where id = $1',[req.session.UserID]);
        const result = await query(
            'select module_name from (module_semester ms join module m on ms.module_id = m.module_id ) where ms.semester = $1',
            [semester.rows[0].semester]
        );
        res.status(200).json({
            firstname: user.firstname,
            lastname : user.lastname,
            modules : result.rows
        });
    }
    else if (req.session.Type === 'Teacher') console.log('Not set yet')
    
    
}


module.exports = getUserInfo
