const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trainingSchema = new Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    trainingType:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
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
    },
    refreshToken: String
})
module.exports = mongoose.model('Training',trainingSchema)
