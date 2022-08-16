const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    traineeName:{
        type: String,
        required: true
    },
    traineeEmail:{
        type: String,
        required: true
    },
    trainerName:{
        type: String,
        required: true
    },
    trainingType:{
        type: String,
        required: true
    },
    trainingId:{
        type: String,
        required: true
    },
    day:{
        type: Date,
        required: true
    },
    startTime:{
        type: Date,
        required: true
    },
    endTime:{
        type: Date,
        required: true
    }
})

module.exports = mongoose.model('Booking', bookingSchema);
