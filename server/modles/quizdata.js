const mongoose = require('mongoose');
const User = require('./user');
const EventQ = require('./eventquiz');

const quizdataschema = mongoose.Schema({
    participant_id: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'User'
    },
    quiz_id: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "EventQuiz"
    },
    ques_seq: {
        type: Array,
        require: true
    },
    ans_seq: {
        type: Array,
        default: null
    },
    correct_ans: {
        type: Number,
        default: null
    },
    hint_used: {
        type: Number,
        default: null
    },
    submit_time: {
        type: Date,
        default: null
    },
    submit_status: {
        type: Number,
        default: 0
    }
}, {
    usePushEach: true
});

var QuizData = mongoose.model('QuizData', quizdataschema);

module.exports = QuizData;