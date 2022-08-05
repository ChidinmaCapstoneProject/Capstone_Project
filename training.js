const express = require("express");
const router = express.Router();
const trainingController = require("../controllers/trainingController");

router.post("/", trainingController.handleNewTraining);
router.get("/", trainingController.getAllTrainings);

module.exports = router;
