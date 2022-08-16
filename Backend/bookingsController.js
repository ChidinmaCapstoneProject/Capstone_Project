const Booking = require ('../model/Booking');
const handleNewBooking = async (req, res) => {
    const { traineeName, traineeEmail, trainerName, trainingType,day, startTime, endTime,trainingId } = req.body;
    if (!traineeName || !traineeEmail || !trainerName || !trainingType || !day || !startTime || !endTime || !trainingId)  {
        return (
            res.status(400).json({ 'message': 'Fill out all information' })
        );
    }

    const duplicate= await Booking.find({trainingId:trainingId});


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
            'trainingId':trainingId,
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
const updateBooking = async (req, res) => {
  if (!req.params.trainingId) {
    return res.status(400).json({ message: "ID parameter required" });
  }
  const booking = await Booking.findOne({ trainingId: req.params.trainingId }).exec();
  if (!booking) {
    return res
      .status(204)
      .json({ message: `No Booking ID matches ${req.params.trainingId} ` });
  }

  if (req.body?.trainingType) booking.trainingType = req.body.trainingType;
  if (req.body?.startTime) booking.startTime = req.body.startTime;
  if (req.body?.endTime) booking.email = req.body.email;
  if (req.body?.day) booking.day = req.body.day;
  const result = await booking.save();
  res.json(result);
};
const deleteBooking = async (req, res) => {
    try {
      const booking = await Booking.find({ trainingId: req.params.bookingId }).exec();

      if (!booking) {
        return res
          .status(404)
          .json({ message: `No Booking ID matches ${req.params.bookingId} ` }); //bODY??? OR PARAMS
      }
      const result = await Booking.deleteMany({ trainingId: req.params.bookingId });
      res.json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  };
module.exports =
{
    handleNewBooking,
    getAllBookings,
    updateBooking,
    deleteBooking
}
