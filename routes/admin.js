const express = require('express');
const route = express.Router();
var {
    auth
} = require('./utils/auth');
var {
    Event
} = require('../server/modles/event');
var User = require('../server/modles/user');
var Participant = require('../server/modles/participant');

route.get('/', (req, res) => {
    var data = {
        validate: req.session.validate,
        status: req.session.status
    };
    res.render('admin/login', {
        data
    });
});
route.post('/checkLogin', async (req, res) => {
    var data = {};
    try {
        data = await User.find({
            'email': req.body['username'],
            'password_hash': req.body['pass']
        });
        if (data.length > 0) {
            req.session.status = data[0].status;
            // console.log(data[0].unique_user_id);
            req.session.userid = data[0].unique_user_id;
            // console.log(req.session.id);
            if(data[0].status==0){
            req.session.validate = true
            res.render('admin');
            }
            else{
                req.session.validate = false
                res.redirect('/admin'); 
            }
        } else {
            req.session.validate = false
            res.redirect('/admin');
        }
    } catch (e) {
        console.log('Error :- ', e);
    }
});
route.get('/participation', auth, async (req, res) => {
    try {
        const event = req.query['event'];
        const paystatus = req.query['payStatus'];
        const sortby = req.query['sortBY'];
        console.log(`${event} , ${paystatus} , ${sortby}`);
        if (event !== undefined && paystatus !== undefined && sortby !== undefined) {
            var docs = await Event.FindAllEvent();
            if (paystatus === "") {
                var participant = await Participant.find({
                    'event_id': event,
                })
            } else {
                var participant = await Participant.find({
                    'event_id': event,
                    'pay_status': parseInt(paystatus)
                })
            }
            var head = [];
            for (i = 0; i < participant.length; i++) {
                head.push(participant[i].head_id);
            }
            var user = await User.find({
                "unique_user_id": {
                    "$in": [JSON.stringify(head)]
                }
            }).sort(sortby);
            console.log(user);
            //var s = partcipant.length;
            res.render('admin/participation', {
                docs,
                participant,
                user
            });
        } else {
            var docs = await Event.FindAllEvent();
            res.render('admin/participation', {
                docs
            });
        }
    } catch (e) {
        console.log("Error :- ", e);
    }
});

route.get('/query', auth, async (req, res) => {
    try {
        var docs = await Event.FindAllEvent();
        res.render('admin/querydesk', {
            docs
        });
    } catch (e) {
        console.log("Error :- ", e);
    }
});

route.get('/task', auth, async (req, res) => {
    try {
        var docs = await Event.FindAllEvent();
        res.render('admin/admintask', {
            docs
        });
    } catch (e) {
        console.log("Error :- ", e);
    }
});
route.get('/contact', auth, async (req, res) => {
    try {
        var d = req.query['sortBy'];
        if (d !== undefined && d.length !== 0) {
            var docs = await User.find({}).sort(req.query['sortBy']);
            res.render('admin/contactgeneration', {
                docs
            });
        } else {
            var docs = {};
            res.render('admin/contactgeneration', {
                docs
            });
        }
    } catch (e) {
        console.log("Error :- ", e);
    }
});

route.get('/certificate', (req, res) => {
    res.render('admin/certificategeneration');
});

route.post('/getdata/:phoneno', auth, async (req, res) => {
    try {
        var docs = await User.find({
            phone_number: req.params['phoneno']
        });
        var newDocs = JSON.stringify(docs);
        res.send(newDocs);
    } catch (e) {
        console.log("Error :- ", e);
    }
});

route.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/admin');
});
module.exports = route;