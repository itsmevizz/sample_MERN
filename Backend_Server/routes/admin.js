var express = require('express');
var router = express.Router();
const userController = require('../controller/userController')

router.get('/userData',userController.getUserData )
router.patch('/blockUser',userController.blockUser)
router.patch('/unBlockUser',userController.unBlockUser)
router.post('/addUser',userController.addUser)
module.exports = router;
