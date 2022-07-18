const Training = require('../model/Training')

const handleNewTraining = async (req, res) => {
    const { fName, email, description, trainingType, price } = req.body;
    if (!fName || !email || !description || !trainingType || !price) {
        return (
            res.status(400).json({ 'message': 'Fill out all information' })
        );
    }
    try {
        //Create and store the new training
        const result = await Training.create( { 
            'fullname': fName, 
            'email': email,
            'trainingType': trainingType,
            'description': description,
            'price': price
        });
        console.log(result);
        
        res.status(201).json({ 'success': `New Training for' ${fName} created` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}
const getAllTrainings = async(req, res) =>{
    const trainings = await Training.find();
    if(!trainings) return res.status(204).json({'message': 'No Trainings Found'});
    res.json(trainings)
}
module.exports = 
{
    handleNewTraining,
    getAllTrainings
}