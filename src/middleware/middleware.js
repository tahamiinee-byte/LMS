const {pool} = require("../config/dbcon.js");

async function requireAuth(req, res, next) {
    const id = req.session.UserID;
    if (!id) return res.redirect('/')
    const ChechUserID = await pool.query("SELECT EXISTS (SELECT 1 FROM person where id = $1 );", [id])
    if (!ChechUserID.rows[0].exists) {
        return res.redirect("/")
    }
    next();
}

module.exports = requireAuth 