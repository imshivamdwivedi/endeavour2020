const express = require('express')
const route = express.Router();
var {
    auth
} = require('./utils/auth');
var {
    Event
} = require('../server/modles/event');
var EventQuiz = require('../server/modles/eventquiz');

route.get('/quizaddition', auth, async (req, res) => {
    try {
        var docs = await Event.FindAllEvent();
        res.render('event/quizaddition', {
            docs
        });
    } catch (e) {
        console.log("Error :- ", e);
    }
});
route.get('/eventcreation', auth, (req, res) => {
    res.render('event/eventcreation');
});
route.get('/quizmanage', auth, async (req, res) => {
    try {
        var docs = await EventQuiz.aggregate([{
            $lookup: {
                from: 'events',
                localField: 'event_id',
                foreignField: '_id',
                as: 'quizdata'
            }
        }]);
        // console.log(docs[0].quizdata)
        res.render('event/quizmanage', {
            docs
        });
    } catch (e) {
        console.log("Error :- ", e);
    }
});
route.get('/quizpasswordgeneration', auth, (req, res) => {
    res.render('event/quizpg');
});
route.post('/addevent', auth, async (req, res) => {
    try {
        var data = {
            eventName: req.body.eventname,
            category: req.body.category,
            maxMember: parseInt(req.body.member),
            maxRound: parseInt(req.body.round),
            description: req.body.description,
            rules: req.body.rules,
            participant_amount: parseInt(req.body.amount)
        };
        var event = new Event(data);
        await event.save();
        res.redirect('/admin/eventcreation');
    } catch (e) {
        console.log("Error :- ", e);
    }
});
route.post('/addquiz', auth, async (req, res) => {
    try {
        var data = {
            event_id: req.body.event,
            quiz_round: req.body.round,
            round_score: req.body.score,
            quiz_time: req.body.time,
            hint_status: req.body.hint,
            hint_deduction: req.body.hintmarks
        };
        var eventquiz = new EventQuiz(data);
        await eventquiz.save();
        res.redirect('/admin/quizaddition');

    } catch (e) {
        console.log("Error :- ", e);
    }
});

route.post('/startquiz/:id', auth, async (req, res) => {
    try {
        var id = req.params['id'];
        var docs = await EventQuiz.findOneAndUpdate({
            "_id": id
        }, {
            $set: {
                quiz_status: true
            }
        }, {
            new: true
        });
        if (docs) {
            res.sendStatus(200);
        }
    } catch (e) {
        console.log("Error :- ", e);
    }
});
route.post('/endquiz/:id', auth, async (req, res) => {
    try {
        var id = req.params['id'];
        var docs = await EventQuiz.findOneAndUpdate({
            "_id": id
        }, {
            $set: {
                taken_status: true
            }
        }, {
            new: true
        })
        if (docs) {
            res.sendStatus(200);
        }
    } catch (e) {
        console.log("Error :- ", e);
    }
});
module.exports = route;
