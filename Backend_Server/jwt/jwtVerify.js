const asyncHandler = require('express-async-handler')
var jwt = require('jsonwebtoken');
require('dotenv').config()

const verifyJwt = asyncHandler(async(req, res, next) => {
    // const token = req.cookies
    const authHeader =await req.headers['token']
        jwt.verify(authHeader, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                throw new Error("Session expired");
            } else {
                next()
            }

        })
})

module.exports = verifyJwt