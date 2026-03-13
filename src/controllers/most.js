const express = require('express')
const path = require('path')
const {pool} = require(path.resolve(__dirname,'../config/dbcon.js'))

const getUserInfo = async (req,res)=>{
    const result = await pool.query(
        'select firstname,lastname from person where id = $1',
        [req.session.userID]
    )
    res.json(result.rows[0])
}

module.exports = {getUserInfo}
