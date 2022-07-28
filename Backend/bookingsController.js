const Booking = require ('../model/Booking');
const handleNewBooking = async (req, res) => {
    const { traineeName, traineeEmail, trainerName, trainingType,day, startTime, endTime } = req.body;
    if (!traineeName || !traineeEmail || !trainerName || !trainingType || !day || !startTime || !endTime)  {
        return (
            res.status(400).json({ 'message': 'Fill out all information' })
        );
    }

    const duplicate= await Booking.find({traineeName:traineeName, trainerName :trainerName, trainingType : trainingType,day : day, startTime : startTime });

    if (duplicate.length>0) {
        return res.sendStatus(409); //confilct status
    }
    try {
        //Create and store the new training
        const result = await Booking.create( {
            'traineeName': traineeName,
            'traineeEmail': traineeEmail,
            'trainerName': trainerName,
            'trainingType': trainingType,
            'day':day,
            'startTime':startTime,
            'endTime':endTime
        });


        res.status(201).json({ 'success': `New Booking for' ${traineeName} created` });
    } catch (err) {

        res.status(500).json({ 'message': err.message });
    }
}
const getAllBookings = async(req, res) =>{
    const bookings = await Booking.find();
    if(!bookings) return res.status(204).json({'message': 'No Bookings Found'});
    res.json(bookings)
}
module.exports =
{
    handleNewBooking,
    getAllBookings
}
