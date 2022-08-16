const Conversation = require('../model/Conversation');

const handleConversation = async (req, res) =>{
    const {senderId, receiverId} = req.body;
    if(! senderId, !receiverId){
        return (
        res.status(400).json({ 'message': 'Fill out all information' })
        )
    }
    try{
        const result = await Conversation.create( {
            'members':[senderId, receiverId]
        })

        res.status(200).json({result});
    }catch(err){
        res.status(500).json({ 'message': err.message });
    }
}
const getConversationId = async(req, res) =>{
    try{
    const {userId} = req.params;
    const conversations = await Conversation.find({
        members: {$in : [userId]}
    });
    if(!conversations) return res.status(204).json({'message': 'No Id Found'});
    res.status(200).json(conversations)

    }catch(err){
        res.status(500).json(err);
    }
}
module.exports = {handleConversation, getConversationId}
