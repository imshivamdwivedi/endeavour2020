const express = require('express');
const route = express.Router();
var {
    auth
} = require('./utils/auth');
var {
    Event
} = require('../server/modles/event');
var User = require('../server/modles/user');
var Question = require('../server/modles/questions');

route.get('/addquestion', auth, async (req, res) => {
    var docs = await Event.FindAllEvent()
    res.render('quiz/addquestion', {
        docs
    });
});
route.get('/questionlist', auth, async (req, res) => {
    try {
        var eventdata = await Event.FindAllEvent();
        if (req.query) {
            var docs = await Question.find({
                event_id: req.query.event,
                event_round: req.query.round
            });
            res.render('quiz/questionlist', {
                eventdata,
                docs
            });

        } else {
            var docs = {};
            res.render('quiz/questionlist', {
                eventdata,
                docs
            });
        }
    } catch (e) {
        console.log("Error :- ", e);
    }
});
route.get('/result', auth, (req, res) => {
    res.render('quiz/resultgeneration');
});
route.post('/questionadd', auth, async (req, res) => {;
    console.log('in')
    try {
        var data = {
            event_id: req.body.events,
            event_round: req.body.round,
            question: req.body.question,
            option_a: req.body.option_a,
            option_b: req.body.option_b,
            option_c: req.body.option_c,
            option_d: req.body.option_d,
            correct_ans: req.body.ans
        };
        var question = new Question(data);
        await question.save();
        res.redirect('/admin/addquestion');
    } catch (e) {
        console.log("Error :- ", e);
    }
});

module.exports = route;