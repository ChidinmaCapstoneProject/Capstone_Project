const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    traineeName:{
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
    rating:{
        type: Number,
        required: true
    },
    review:{
        type: String,
        required: true
    },
    date:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Review', reviewSchema);
