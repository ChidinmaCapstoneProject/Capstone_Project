const Training = require("../model/Training");
const handleNewTraining = async (req, res) => {
  const {
    userName,
    email,
    description,
    trainingType,
    price,
    slots,
    startTime,
    endTime,
    day,
    Id,
  } = req.body;
  if (
    !userName ||
    !email ||
    !description ||
    !trainingType ||
    !price ||
    !startTime ||
    !endTime ||
    !day ||
    !Id ||
    !slots
  ) {
    return res.status(400).json({ message: "Fill out all information" });
  }
  try {
    const result = await Training.create({
      fullname: userName,
      email: email,
      Id: Id,
      trainingType: trainingType,
      description: description,
      price: price,
      slots: slots,
      startTime: startTime,
      endTime: endTime,
      day: day,
    });

    res.status(201).json({ success: `New Training for' ${userName} created` });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};
const getAllTrainings = async (req, res) => {
  const trainings = await Training.find();
  if (!trainings)
    return res.status(204).json({ message: "No Trainings Found" });
  res.json(trainings);
};
const updateTraining = async (req, res) => {
  if (!req.params.trainingId) {
    return res.status(400).json({ message: "ID parameter required" });
  }
  const training = await Training.findOne({ _id: req.params.trainingId }).exec();
  if (!training) {
    return res
      .status(204)
      .json({ message: `No Training ID matches ${req.params.trainingId} ` });
  }
  if (req.body?.email) training.email = req.body.email;
  if (req.body?.trainingType) training.trainingType = req.body.trainingType;
  if (req.body?.description) training.description = req.body.description;
  if (req.body?.price) training.price = req.body.price;
  if (req.body?.slots) training.slots = req.body.slots;
  if (req.body?.startTime) training.startTime = req.body.startTime;
  if (req.body?.endTime) training.email = req.body.email;
  if (req.body?.day) training.day = req.body.day;
  const result = await training.save();
  res.json(result);
};
const deleteTraining = async (req, res) => {
  try {
    const training = await Training.findOne({ _id: req.params.trainingId }).exec();
    if (!training) {
      return res
        .status(404)
        .json({ message: `No Training ID matches ${req.params.trainingId} ` });
    }
    const result = await Training.deleteOne({ _id: req.params.trainingId });
    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};
module.exports = {
  handleNewTraining,
  getAllTrainings,
  updateTraining,
  deleteTraining,
};
