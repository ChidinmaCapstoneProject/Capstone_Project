const Message = require('../model/Message');

const handleMessage = async (req, res) =>{
    // const {conversationId, sender, text} = req.body;
    // if(! conversationId, !sender, !text){
    //     return (
    //     res.status(400).json({ 'message': 'Fill out all information' })
    //     )
    // }
    try{
        const result = await Message.create(req.body);
        console.log(result)
    }catch(err){
        res.status(500).json({'message': err.message})
    }
}

const getAllMessages =async (req,res) =>{
    try{
        const messages = await Message.find({
            conversationId: req.params.conversationId,
          });

          res.status(200).json(messages);

    }catch(err){
        res.status(500).json({'message': err.message})
    }
}
module.exports ={handleMessage, getAllMessages}
