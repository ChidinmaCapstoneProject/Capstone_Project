const Gymnut = require('../model/Gymnut');

const getAllGymnuts = async(req, res) =>{
    const gymnuts = await Gymnut.find();
    if(!gymnuts) return res.status(204).json({'message': 'No Gymnuts Found'});
    res.json(gymnuts)
}

const createNewGymnut = async (req, res) =>{
   if(!req?.body.fullname || !req?.body?.email){
    return res.status(400).json({'message': 'Fullname and Email are required'});
   }

   try{
    const result = await Gymnut.create({
        fullname:req.body.fullname,
        lastname:req.body.lastname
    });

    res.status(201).json(result)
   }catch(err){
    res.status(500).json({'message': err.message})
   }
}
const updateGymnut = async (req, res) =>{
    if(!req?.body?.id){
        return res.status(400).json({'message': 'ID parameter required'});
    }
    const gymnut = await Gymnut.findOne({_id: req.body.id}).exec();
    if(!gymnut){
        return res.status(204).json({'message': `No Gymnut ID matches ${req.body.id} `})
    }
    if(req.body?.fullname) gymnut.fullname =req.body.fullname;
    if(req.body?.email) gymnut.email =req.body.email;

    const result = await gymnut.save();
    res.json(result);
}

const deleteGymnut = async (req, res) =>{
    if(!req?.body?.id){
        return res.status(400).json({'message': ' GymnutID  required'});
    }
    const gymnut = await Gymnut.findOne({_id: req.body.id}).exec();
    if(!gymnut){
        return res.status(204).json({'message': `No Gymnut ID matches ${req.body.id} `})
    }
    const result = await gymnut.deleteOne({_id: req.body.id});
    res.json(result);
}
const getGymnut = async (req, res) =>{
    if(!req?.params?.id){
        return res.status(400).json({'me  ssage': ' GymnutID  required'});
    }
    const gymnut = await Gymnut.findOne({_id: req.params.id}).exec();
    if(!gymnut){
        return res.status(204).json({'message': `No Gymnut ID matches ${req.params.id} `})
    }
    res.json(gymnut);
}
module.exports = {
    getAllGymnuts,
    createNewGymnut,
    updateGymnut,
    deleteGymnut,
    getGymnut
}
