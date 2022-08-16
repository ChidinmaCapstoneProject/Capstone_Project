const express = require("express");
const router = express.Router();
const trainingController = require("../controllers/trainingController");

router.post("/", trainingController.handleNewTraining);
router.get("/", trainingController.getAllTrainings);
router.put("/:trainingId", trainingController.updateTraining);
router.delete("/:trainingId", trainingController.deleteTraining);

module.exports = router;
