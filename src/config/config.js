const dotenv = require('dotenv')
const path = require('path')

dotenv.config({path: path.resolve(__dirname,'../../.env')});

const dbconfig = {
    host : process.env.DB_HOST,
    port :process.env.DB_PORT,
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD , 
    database : process.env.DB_NAME 
}

<<<<<<< HEAD
module.exports = {dbconfig};
=======
const sessionConfig = {
    secret : process.env.SECRET
}
module.exports = {config ,dbconfig, sessionConfig};
>>>>>>> 283d5ba (Creating a session)
