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

module.exports = {
  handleNewTraining,
  getAllTrainings,
};
