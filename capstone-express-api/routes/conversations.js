const express = require('express');
const router = express.Router();
const conversationController = require('../controllers/conversationsController');

router.post('/', conversationController.handleConversation);
router.get('/:userId', conversationController.getConversationId)
module.exports= router;
