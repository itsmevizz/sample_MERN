const express = require('express');
const router = express.Router();
const userController = require('../controller/userController')
/* GET home page. */
router.post('/signup', userController.registerUser)
router.post('/login', userController.authUser)



module.exports = router;
