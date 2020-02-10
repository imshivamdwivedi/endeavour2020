const express = require('express');
const route = express.Router();
const nodemailer = require('nodemailer');
var User = require('../server/modles/user');
const axios = require('axios');
var {
    Event
} = require('../server/modles/event');
var Participant = require('../server/modles/participant');
var Transaction = require('../server/modles/transaction');

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
        
                   }],
               });
            var eventarr = [];
            var payarr =[];
            for(i = 0; i < par.length; i++) {
                   eventarr.push(par[i].event_id);
                   payarr.push(parseInt(par[i].pay_status));
            }
            var eventid=[];
          for(i=0;i<eventarr.length;i++){
            eventid[i]= await Event.findOne({
                "_id":eventarr[i]
            });
        } 
            //console.log(eventid[0].eventName);
            var eventnames =[];
            for(i=0;i<eventid.length;i++)
                  eventnames.push(eventid[i].eventName);
            
console.log(eventnames[0] + " " +eventnames[1]+" "+eventnames[2]+" "+eventnames[3]);
console.log(payarr[0]+" "+payarr[1]+" "+payarr[2]+" "+payarr[3]);

            
            req.session.pay = payarr;   
            req.session.events = eventnames;
            req.session.eventsl = eventnames.length;
           // console.log(req.session.eventname);
            res.render('default/index',{
                x:req.session.userid,
                y:req.session.name,
                eventnames,
                K:payarr,
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

route.get('/',(req, res) => {
 
    res.render('default/index',{
        x:req.session.userid,
        y:req.session.name,
        eventnames:req.session.events,
        K:req.session.pay,
        z:req.session.eventsl
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
        eventnames:req.session.events,
        K:req.session.pay,
        z:req.session.eventsl
    });
 
});
route.get('/adduser', (req, res) => {

    res.render('default/index',{
        x:req.session.userid,
        y:req.session.name,
        eventnames:req.session.events,
        K:req.session.pay,
        z:req.session.eventsl
    });

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
              eventnames:req.session.events,
              K:req.session.pay,
              z:req.session.eventsl
              
         });
        }
      });
    }  catch(e){
         console.log('Error:-', e);
    }

}
});
//route.post('/paymentt',async(req,res)=>{

 //   var al = req.session.userid;
 //   var str = req.body['CUST_ID']+req.body['EVENT_ID']
 //   var parts = str.split(al);
 //   console.log(req.body['CUST_ID']+req.body['EVENT_ID']);
 //   console.log(al);
  //  console.log(parts[1]);
//});
route.post('/payment',async(req,res)=>{
    try {
        if(req.body['CUST_ID']){
         var params ={};
         params.APP_KEY = 'ENDEAVOUR_20_QBZPJA'
         params.CUST_ID = req.body['CUST_ID']+req.body['EVENT_ID'],
         params.TXN_AMOUNT= req.body['TXN_AMOUNT'],
         res.redirect('https://tech.kiet.edu/erp-apis/index.php/payment/do_transaction?APP_KEY=ENDEAVOUR_20_QBZPJA&CUST_ID='+params.CUST_ID+'&TXN_AMOUNT='+params.TXN_AMOUNT+'&CALLBACK_URL=http://endeavour-kiet.in/response');
        }
        else{
               res.render('default/page');
        }
    } catch (error) {
        console.log('Error:-',error);
    }
});

route.get('/paystatus',async(req,res)=>{
      try {
       
        console.log(paydetail[0].pay_status);
        console.log(paydetail[0].team_id);
      } catch (error) {
          console.log('Error',error)
      }
});

route.post('/response',async(req,res)=>{
    try {
        var al = req.session.userid;
        var str = res.req.body.CUST_ID;
        var parts = str.split(al);
        res.req.body.EVENT_ID = parts[1];
        res.req.body.CUST_ID = al;

      //  console.log(res.req.body.CUST_ID );
       // console.log(res.req.body.EVENT_ID );
      
     

       console.log(res.req.body);
        var payment = await Transaction(res.req.body);
        // console.log(payment);
        await payment.save();
       // console.log(payment.RESPCODE);
       paydetail = await Participant.find({'head_id':req.session.userid,'event_id':res.req.body.EVENT_ID});
      // console.log(paydetail[0].pay_status);
      // console.log(paydetail.length);
         if(paydetail.length > 0){
           await Participant.updateOne({
                'head_id': res.req.body.CUST_ID,
                'event_id':res.req.body.EVENT_ID
            }, {
                $set: {
                    'pay_status': res.req.body.RESPCODE
                }
            }, function(err, results) {
               // console.log(results.result);
            });
         // console.log(res.req.body.RESPCODE);
         }  

        // console.log(paydetail[0].pay_status);
        
   
        res.render('default/index',{
            x:req.session.userid,
            y:req.session.name,
            eventnames:req.session.events,
            K:req.session.pay,
            z:req.session.evensl
        });
        
    } catch (error) {
        console.log('Error:',error);
    } 

});
route.get('/wow',(req,res)=>{
 console.log(req.session.userid);
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
