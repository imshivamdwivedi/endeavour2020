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
                "unique_user_id": head
            }).sort(sortby);
            
            //console.log(docs);
           console.log(participant);
            res.render('admin/participation', {
                participant,
                docs,
                user,
                s:participant.length
            });
        } else {
            var docs = await Event.FindAllEvent();
            var participant = await Participant.find({});
            var user = await User.find({});
            res.render('admin/participation', {
                participant,
                docs,
                user,
                s:participant.length
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

route.get('/team', async(req,res) =>{
    try {
        var participant = await User.find({
            'head_id':req.query.head_id
        });
        var newPartcipant = JSON.stringify(participant);
        res.send(newPartcipant);
    } catch (e) {
        console.log("Error :- ", e);
    }
});
route.get('/event_team_reg',async(req,res)=>{
    var team=[];
        team[0] = req.query.mmb1;
        team[1] = req.query.mmb2;
        team[2] = req.query.mmb3;
    
   if(team.length>0){ 
    if(await User.find({"unique_user_id":req.body.team_id})){
       pdetaill = await Participant.find({
           "head_id":req.query.head_id, 
           "event_id":req.query.event_id
        });
        if(pdetaill.length>0){
            return res.send({success : "", status : 95});         
        }else{
        var participant_data = {
            "head_id":req.query.head_id,
            "team_id":team,
            "event_id":req.query.event_id
        }

        var participant = await Participant(participant_data);
        await participant.save();
       
         return res.send({success : "", status:200});
    } 
    }
    else{
        return res.send({success : "", value : false});
    }
   }else{
    pdetail = await Participant.find({
        "head_id":req.query.head_id, 
        "event_id":req.query.event_id 
     });
     if(pdetail.length>0){
         return res.send({success : "", status : 95});        
    }else{
    var participant_data = {
        "head_id":req.query.head_id,
        "team_id":team,
        "event_id":req.query.event_id
    }

    var participant = await Participant(participant_data);
    await participant.save();
   
     return res.send({success : "", status:200});
    } 

   } 
});

route.get('/team_pay',async(req,res)=>{

      pdetails = await Participant.find({
          "head_id":req.query.head_id,
          "event_id":req.query.event_id
      });
      if(pdetails.length>0){
        await Participant.updateOne({
            'head_id': req.query.head_id,
            'event_id':req.query.event_id
        }, {
            $set: {
                'pay_status': 1
            }
        }, function(err, results) {
           // console.log(results.result);
        });

        return res.send({success:"",status:200}); 

      }else{
        return res.send({success : "", value : false});
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