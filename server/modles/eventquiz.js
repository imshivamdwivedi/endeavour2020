const mongoose = require('mongoose');
const {
    Event
} = require('./event');

var eventquizSchema = mongoose.Schema({
    event_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Event
    },
    quiz_round: {
        type: Number,
        require: true
    },
    round_score: {
        type: Number,
        require: true
    },
    quiz_time: {
        type: Number,
        require: true
    },
    hint_status: {
        type: Boolean,
        require: true,
        default: false
    },
    hint_deduction: {
        type: Number,
        require: true
    },
    taken_status: {
        type: Boolean,
        default: false
    },
    quiz_status: {
        type: Boolean,
        default: false
    },
    auth_person: {
        type: Array,
        default: null
    }
});

var EventQuiz = mongoose.model('EventQuiz', eventquizSchema);

module.exports = EventQuiz;
