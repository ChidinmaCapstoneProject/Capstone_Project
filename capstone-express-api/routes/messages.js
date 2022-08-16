const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messagesController');

router.post('/',messageController.handleMessage);
router.get('/:conversationId', messageController.getAllMessages)
module.exports= router;
