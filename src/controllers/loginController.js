const query = require("../db/connection.js")

const CheckingLoginCredential = async (req , res)=>{
    const {id,password} = req.body ;  
    const resultQuery = await query("SELECT pw from person where id = $1" , [id]);
    if (resultQuery.rowCount === 0 ){
        return res.status(404).json({message : "Wrong credentials"})
    }
    const PasswordDb = resultQuery.rows[0].pw ; 
    // We need first to hash the PasswordDB and then compare it with password entered by the user
    if (PasswordDb === password){
        console.log("Welcome");
    }
    else {
        console.log("Wrong credentials")
        return res.status(404).json({message : "Wrong credentials"})
    }
}

module.exports= CheckingLoginCredential