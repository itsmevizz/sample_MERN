const asyncHandler = require('express-async-handler')
const generateToken = require('../utils/genarateToken')
require('dotenv').config()
module.exports = {
    login : asyncHandler((req,res)=>{
        const {name, password} = req.body
        console.log(req.body);
        if(name === process.env.ADMIN_USER_ID && password === process.env.ADMIN_PASS){
            const token =generateToken("183153")
            // res.cookie("token",token, { maxAge: 900000, })
            res.json({token:token})

        }else{
            throw new Error('Invalid admin')
        }
    }),
    logout:((req,res)=>{
        res.clearCookie('token')
        res.json("Logout")
    })
}