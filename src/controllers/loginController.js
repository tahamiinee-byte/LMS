const query = require("../db/connection.js");

const CheckingLoginCredential = async (req , res)=>{
    const {id,password} = req.body ;  
    const resultQuery = await query("SELECT pw , person_type from person where id = $1 ;" , [id]);
    if (resultQuery.rowCount === 0 ){
        return res.status(404).json({message : "Wrong credentials"})
    }
    const PasswordDb = resultQuery.rows[0].pw ;

    // We need first to hash the PasswordDB and then compare it with password entered by the user
    if (PasswordDb === password){
        req.session.UserID = id 
        req.session.Type = resultQuery.rows[0].person_type 
        res.redirect('/dashboard')
        //console.log("Welcome");
    }
    else {
        console.log("Wrong credentials")
        return res.status(404).json({message : "Wrong credentials"})
    }
}
const GetDashboardPage = async (req,res)=>{
    const id = req.session.UserID ;
    const ChechUserID = await query("SELECT 1 FROM person where id = $1 ;" , [id])  
    if (ChechUserID) {
        //res.sendFile(path.resolve(__dirname , "../../public/dashboard.html"))
        console.log("done")
    }
}

module.exports= {CheckingLoginCredential , GetDashboardPage}