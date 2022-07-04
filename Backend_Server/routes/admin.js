var express = require('express');
var router = express.Router();
const userController = require('../controller/userController')
const adminController = require('../controller/adminController')
const verifyJwt = require('../jwt/jwtVerify')
require('dotenv').config()
var jwt = require('jsonwebtoken');
router.get('/userData', userController.getUserData)
router.patch('/blockUser', verifyJwt, userController.blockUser)
router.patch('/unBlockUser', verifyJwt, userController.unBlockUser)
router.post('/addUser', verifyJwt, userController.addUser)
router.post('/admin_login', adminController.login)
router.post('/admin_logout', adminController.logout)
module.exports = router;
