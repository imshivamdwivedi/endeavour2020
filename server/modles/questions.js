const mongoose = require('mongoose');
const {Event} = require('./event');

var quesSchema = mongoose.Schema({
    event_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Event'
    },
    event_round: {
        type: Number,
        required: true
    },
    question: {
        type: String,
        required: true
    },
    option_a: {
        type: String,
        required: true
    },
    option_b: {
        type: String,
        required: true
    },
    option_c: {
        type: String,
        required: true
    },
    option_d: {
        type: String,
        required: true
    },
    correct_ans: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    updated_at: {
        type: Date,
        default: null
    }
});


var Question = mongoose.model('Question',quesSchema);

module.exports = Question;
