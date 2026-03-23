const query = require("../db/connection.js");


const getUserInfo = async (req,res)=>{
    const result = await query(
        'select firstname,lastname from person where id = $1',
        [req.session.UserID]
    )
    const user = result.rows[0]
    let obj = {
        firstname: user.firstname,
        lastname : user.lastname
    }
    let resultQuery;
    if (req.session.Type === 'student'){
        const semester = await query('select semester from student where id = $1',[req.session.UserID]);
        resultQuery = await query(
            'select module_name from (module_semester ms join module m on ms.module_id = m.module_id ) where ms.semester = $1',
            [semester.rows[0].semester]
        );
    }
    else if (req.session.Type === 'teacher') {
        resultQuery = await query("select module_name from (teacher_group_module tgm join module m on m.module_id = tgm.module_id) where id =$1 ",[req.session.UserID]);
    }
    obj.modules= resultQuery.rows
    res.status(200).json(obj);  
}


module.exports = getUserInfo
