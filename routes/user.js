const path = require('path');

const express = require('express');

const userController = require('../controllers/user');
const authenticator=require('../middleware/authenticator') 
const router = express.Router();


router.post('/signin', userController.signin);

router.post('/signup',userController.signup);



module.exports = router;