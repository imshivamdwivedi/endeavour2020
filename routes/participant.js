const express = require('express');
const route = express.Router();
const {
    auth
} = require('./utils/auth');
var {
    Event
} = require('../server/modles/event');
// var Event = require('../server/modles/eventquiz');
var Participant = require('../server/modles/participant');
var EventQuiz = require('../server/modles/eventquiz');
var User = require('../server/modles/user');
var Question = require('../server/modles/questions');

route.get('/', (req, res) => {
     res.render('participant/login');
 });
 //route.post('/checkdetail', async (req, res) => {
   //  var cdata = {};
    //try {
      //   data = await User.find({
        //     'email': req.body['username'],
          //   'password_hash': req.body['pass']
         //});
         //if (data.length > 0) {
         //    cdata.data = data;
          //   par = await Participant.find({
            //     $or: [{
             //        "head_id": data[0].unique_user_id
               //  }, {
                 //    "team_id": {
                   //      "$in": [data[0].unique_user_id]
                     //}
    //
  //             }]
    //         });
   //          if (par.length > 0) {
     //            cdata.par = par;
   //              res.render('participant/default', {
     //                cdata
    //             });
      //      }
  //       } else {
     //        res.redirect('/participant?verified=0');
   //      }
   // } catch (e) {
     //    console.log('Error :- ', e);
    // }
 //});
 route.post('/addparticipant',async(req,res)=>{
  try { 
    if(req.body.head_id){
     var participant_data ={
      'head_id': req.body.head_id,
      'team_id':req.body.team_id,
      'event_id':req.body.event_id
    }
    var participant = await Participant(participant_data);
     // if(user.save()){
         await participant.save();
       
         res.render('default/index',{
           x:req.body.head_id,
           y:req.body.head_id.full_name
         });
   } else {
     console.log("REgisteration failed! Try Again"+req.body.head_id+" "+req.body.team_id+" "+req.body.event_id);
   }
 }catch(e){
    console.log('Error:-',e);
 }
 });

route.get('/quiz', auth, async (req, res) => {
    var par = await Participant.find({
        $or: [{
            "head_id": req.session.userid
            // "head_id": "ENDVR189452505120"
        }, {
            "team_id": {
                "$in": [req.session.userid]
                // "$in": ["ENDVR189452505120"]
            }
        }]
    });
    var eventarr = [];
    for (i = 0; i < par.length; i++) {
        eventarr.push(par[i].event_id);
    }
    var event = await EventQuiz.find({
        event_id: {
            "$in": eventarr
        },
        quiz_status: true,
        taken_status: false
    });
    var eventdetail = await Event.find({
        _id: {
            "$in": eventarr
        }
    });
    res.render("participant/quiz", {
        event,
        eventdetail
    });
});
module.exports = route;