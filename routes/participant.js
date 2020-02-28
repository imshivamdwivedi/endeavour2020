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
//var EventQuiz = require('../server/modles/eventquiz');
var User = require('../server/modles/user');

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
 route.post('/addparticipant/bplan', async(req,res)=>{
        try {
          if(req.body.head_id){
            var data =  (await User.find({'unique_user_id':req.body.team_id[0]})||(await user.find({'unique_user_id':req.body.team_id[1]})));
            console.log(data);
            if(data.length>0){
                if((await Participant.findOne({'head_id':req.body.head_id}) || await Participant.findOne({'team_id':req.body.team_id})) && (await Participant.findOne({'event_id':req.body.event_id}))){
                          return res.send({success : "Already registred", status : 95});
                }else{
                  var participant_data ={
                    'head_id': req.body.head_id,
                    'team_id':req.body.team_id,
                    'event_id':req.body.event_id
                    }
                    var participant = await Participant(participant_data);
                    await participant.save();


                    return res.send({success : "", status : 200});
                }
            }else{
              return res.send({success : "Participant not found", status : 96});
            }
          }else{
            return res.send({success:"First login",status:405});
          }
          
        } catch (error) {
          console.log('Error-:',error);
        }
 });
 route.post('/addparticipant/hackathon', async(req,res)=>{
  try {
    if(req.body.head_id){
      var data =  ((await User.findOne({"unique_user_id":req.body.team_id[0]}) || (await User.findOne({'unique_user_id':req.body.team_id[0]}) && await User.findOne({'unique_user_id':req.body.team_id[1]})) || (await User.findOne({'unique_user_id':req.body.team_id[0]}) && await User.findOne({'unique_user_id':req.body.team_id[1]}) && await User.findOne({'unique_user_id':req.body.team_id[2]}))));
      if(data){
          if((await Participant.findOne({'head_id':req.body.head_id}) || await Participant.findOne({'team_id':req.body.team_id})) && (await Participant.findOne({'event_id':req.body.event_id}))){
                    return res.send({success : "Already registred", status : 95});
          }else{
            var participant_data ={
              'head_id': req.body.head_id,
              'team_id':req.body.team_id,
              'event_id':req.body.event_id
              }
              var participant = await Participant(participant_data);
              await participant.save();


              return res.send({success : "", status : 200});
          }
      }else{
        return res.send({success : "Participant not found", status : 96});
      }
    }else{
      return res.send({success:"First login",status:405});
    }
    
  } catch (error) {
    console.log('Error-:',error);
  }
});
 route.post('/addparticipant/comedyeve', async(req,res)=>{
  try {
    if(req.body.head_id){
            var participant_data ={
              'head_id': req.body.head_id,
              'team_id':req.body.team_id,
              'event_id':req.body.event_id
              }
              var participant = await Participant(participant_data);
              await participant.save();


              return res.send({success : "", status : 200});
          
    }else{
      return res.send({success:"First login",status:405});
    }
    
  } catch (error) {
    console.log('Error-:',error);
  }
});
route.post('/addparticipant/mm', async(req,res)=>{
  try {
    if(req.body.head_id){
      var data =  await User.findOne({"unique_user_id":req.body.team_id});
      if(data){
          if((await Participant.findOne({'head_id':req.body.head_id}) || await Participant.findOne({'team_id':req.body.team_id})) && (await Participant.findOne({'event_id':req.body.event_id}))){
                    return res.send({success : "Already registred", status : 95});
          }else{
            var participant_data ={
              'head_id': req.body.head_id,
              'team_id':req.body.team_id,
              'event_id':req.body.event_id
              }
              var participant = await Participant(participant_data);
              await participant.save();


              return res.send({success : "", status : 200});
          }
      }else{
        return res.send({success : "Participant not found", status : 96});
      }
    }else{
      return res.send({success:"First login",status:405});
    }
    
  } catch (error) {
    console.log('Error-:',error);
  }
});
 route.post('/addparticipant',async(req,res)=>{
  try { 
    console.log(req.body.head_id+ " "+ req.body.event_id);
          if(req.body.head_id){ 
            
          
      var participant_data ={
        'head_id': req.body.head_id,
        'team_id':req.body.team_id,
        'event_id':req.body.event_id
        }
        var participant = await Participant(participant_data);
        await participant.save();


        return res.send({success : "", status : 200});
    }
                else{
                  return res.send({success:"First login",status:405});
                } 
       }catch(e){
            console.log('Error:-',e);
       }
 });

//route.get('/quiz', auth, async (req, res) => {
  //  var par = await Participant.find({
    //    $or: [{
      //      "head_id": req.session.userid
//            // "head_id": "ENDVR189452505120"
  //      }, {
    //        "team_id": {
      //          "$in": [req.session.userid]
        //        // "$in": ["ENDVR189452505120"]
          //  }
//        }]
  //  });
    //var eventarr = [];
//    for (i = 0; i < par.length; i++) {
  //      eventarr.push(par[i].event_id);
   // }
//    var event = await EventQuiz.find({
//        event_id: {
//            "$in": eventarr
//        },
//        quiz_status: true,
//        taken_status: false
//    });
//    var eventdetail = await Event.find({
//        _id: {
//            "$in": eventarr
//        }
//    });
//    res.render("participant/quiz", {
//        event,
   //     eventdetail
 //   });
//});
module.exports = route;