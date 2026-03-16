
const path = require('path')
const {pool} = require(path.resolve(__dirname,'../config/dbcon.js'))

const CheckingLoginCredential = async (req, res) => {
    const { id, password } = req.body;
    const resultQuery = await pool.query("SELECT pw , person_type from person where id = $1 ;", [id]);
    if (resultQuery.rowCount === 0) {
        return res.sendStatus(404);
    }
    const PasswordDb = resultQuery.rows[0].pw;

    // We need first to hash the PasswordDB and then compare it with password entered by the user
    if (PasswordDb === password) {
        req.session.UserID = id
        req.session.Type = resultQuery.rows[0].person_type
        res.sendStatus(200)
    }
    else {
        console.log("Wrong credentials")
        return res.sendStatus(404);
    }
}

module.exports = { CheckingLoginCredential }
