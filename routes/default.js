const express = require('express');
const route = express.Router();
const nodemailer = require('nodemailer');
var User = require('../server/modles/user');
//const bcrypt = require('bcrypt');
var {
    Event
} = require('../server/modles/event');
var Participant = require('../server/modles/participant');



route.get('/',(req, res) => {
 
    res.render('default/index',{
        x:req.session.userid,
        y:req.session.name,
    });
});
route.get('/login', async (req, res) => {

    res.render('default/login',{
        x:req.session.userid,
        y:req.session.full_name,
    });
});
route.get('/sponsors', async (req, res) => {
    res.render('default/sponsors');
});
route.get('/team', async (req, res) => {
    res.render('default/team');
});
route.get('/register', (req, res) => {
    res.render('default/registration');
});
route.get('/checkLogin', (req, res) => {

    res.render('default/index',{
        x:req.session.userid,
        y:req.session.name,
    });
});
route.get('/adduser', (req, res) => {

    res.render('default/index',{
        x:req.session.userid,
        y:req.session.name,
    });
});
route.post('/checkLogin', async (req, res) => {
    try {
        detail = await User.find({
            'email': req.body['username'],
            'password_hash': req.body['pass']
        });
        if (detail.length > 0) {
            req.session.status = detail[0].status;
            req.session.userid = detail[0].unique_user_id;
            req.session.name = detail[0].full_name;
            par = await Participant.find({
                 $or: [{
                         "head_id": req.session.userid
                     }, {
                         "team_id": {
                             "$in": [req.session.userid]
                         }
        
                   }]
               });
            var eventarr = [];
            for(i = 0; i < par.length; i++) {
                   eventarr.push(par[i].event_id);
                   //console.log(eventarr[i]);
            }

            eventid= await Event.find({
                "_id":eventarr
            });
            //console.log(eventid[0].eventName);
            var eventnames =[];
            for(i=0;i<eventid.length;i++)
                  eventnames.push(eventid[i].eventName);
               
            
           // console.log(req.session.eventname);
            res.render('default/index',{
                x:req.session.userid,
                y:req.session.name,
                eventnames,
                z:eventnames.length
            });

        }
        else{
            res.render('default/login',{
                y:0
            });
        }
    } catch (e) {
        console.log('Error :- ', e);
    }
});

route.get('/speaker', (req, res) => {
    res.render('default/speaker');
});
route.post('/adduser',async (req, res) => {

    if(await User.findOne({ 'email': req.body['email'] }) ) {
         var col = true;
         res.render('default/registration',{col});
    }
    else if( await User.findOne({'unique_user_id':"ENDVR20"+req.body['mobilenumber']})){
        var rol = true;
        res.render('default/registration',{rol});
    }
    else{
    var data = {
        "univ_roll": req.body['universityno'],
        "unique_user_id": "ENDVR20" + req.body['mobilenumber'],
        "username": req.body['email'],
        "auth_key": "C10wH9RV1IIh96t9a3Z_110lb9DEzhLS",
        "password_hash":req.body['pass'],
        "email": req.body['email'],
        "full_name": req.body['name'],
        "phone_number": req.body['mobilenumber'],
        "college": req.body['collage'],
        "year": req.body['year'],
        "branch": req.body['branch'],
    }
     
    
    var user = await User(data);
    // if(user.save()){
        await user.save();
        req.session.userid="ENDVR20"+req.body['mobilenumber'];
        req.session.name=req.body['name'];
        
         // req.app.locals.userid = "ENDVR20"+req.body['mobilenumber']
   try{ 
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'ecell@kiet.edu',
          pass: 'wecando_it'
        }
      });

      var emailOptions = {
        from: 'Endeavour-20 <ecell@kiet.edu>',
        to: req.body['email'],
        subject: 'Registration',
        html: '<b>Greetings for the day! '+ req.body['name'] +'</b><p>Congratulations for successfully registering with the Endeavour-20 and now you are requested to pen down the generated Endeavour id -<b>' +'ENDVR20'+req.body['mobilenumber']+'</b> as it will act as your identity number on the day of the event. We have brought to you with a variety of events and you may choose according to your interests.<br><br>As you know we team e-Cell is preparing for the most-awaited and astonishing annual fest Endeavour-20 which is to be organised on 29th and 1st March 2020 and we wish you to kindly coordinate with the registration process and for any query contact :<br><br>Harsh Mishra(8601613337)<br>Shivam Dwivedi(9058933387)<br><br>Regards,<br>Team e-Cell </p>'

       };
      transporter.sendMail(emailOptions, (err, info) => {
        if (err) {
          console.log(err);
        } else {
            res.render('default/index',{
              x:req.session.userid,
              y:req.body['name'],
         });
        }
      });
    }  catch(e){
         console.log('Error:-', e);
    }

}
});

route.post('/payment', async(req,res)=>{

      var params ={
        "App_Key":"ENDEAVOUR_20QBZPJA",
        "CUST_ID":req.body['head'],
        "TXN_AMOUNT":req.body['amount'],
        "CALLBACK_URL":"http://localhost:3000/paywithpaytmresponse"
      }
});


route.get('/logout', (req, res) => {
    delete req.session.userid;
delete req.session.name;
req.session.userid=null;
req.session.name=null;
    req.session.destroy((err) => {
        if(err) {
            return console.log(err);
        }
        res.render('default/index',{
            x:null,
            y:null
        });
    });
});

module.exports = route;