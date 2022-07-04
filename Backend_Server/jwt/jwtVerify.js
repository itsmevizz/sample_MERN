const asyncHandler = require('express-async-handler')
var jwt = require('jsonwebtoken');
require('dotenv').config()

const verifyJwt = asyncHandler((req, res, next) => {
    const token = req.cookies
    jwt.verify(token.token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            // res.json({error:"Token mismatch"})
            throw new Error("Token mismatch");
        } else {
            next()
        }

    })
})

module.exports = verifyJwt