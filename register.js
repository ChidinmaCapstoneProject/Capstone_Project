const express = require('express')
const router = express.Router();
const User = require('../controllers/registerController');


router.post('/', User.handleNewUser)
router.get('/', User.getAllUsers)

module.exports= router;
