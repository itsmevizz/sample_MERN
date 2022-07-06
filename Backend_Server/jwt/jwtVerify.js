const asyncHandler = require('express-async-handler')
var jwt = require('jsonwebtoken');
require('dotenv').config()

const verifyJwt = asyncHandler((req, res, next) => {
    const token = req.cookies
    jwt.verify(token.token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            // res.json({error:"Token mismatch"})
            res.clearCookie('token')
            throw new Error("Session expired");
        } else {
            next()
        }

    })
})

module.exports = verifyJwt