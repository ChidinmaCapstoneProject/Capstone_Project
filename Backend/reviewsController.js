const Review = require ('../model/Review');
const handleNewReview = async (req, res) => {
    const { traineeName, trainerName, trainingType, currentValue, review, date } = req.body;
    if (!traineeName || !trainerName || !trainingType || !currentValue || !review || !date) {
        return (
            res.status(400).json({ 'message': 'Fill out all information' })
        );
    }
    try {
        //Create and store the new training
        const result = await Review.create( {
            'trainerName': trainerName,
            'trainingType': trainingType,
            'traineeName': traineeName,
            'rating': currentValue,
            'review': review,
            'date': date
        });


        res.status(201).json({ 'success': `New Review for' ${trainerName}'s ${trainingType} class created` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}
const getAllReviews = async(req, res) =>{
    const Reviews = await Review.find();
    if(!Reviews) return res.status(204).json({'message': 'No Reviews Found'});
    res.json(Reviews)
}
module.exports =
{
    handleNewReview,
    getAllReviews
}
