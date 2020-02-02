// required packages
const express = require('express');
const mongoose = require('mongoose');
var config = require('./config');
mongoose.Promise = global.Promise;
//let conn = 'mongodb://admin:Fuck~root1@ds125402.mlab.com:25402/endeavourkiet_19';
const uri = config.mongoUrl;
const connect = mongoose.connect(uri,{ useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

connect.then((db) => {
    console.log("Connected correctly to database");
}, (err) => { console.log(err); });

// const mongoose = require('./db/mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const path = require('path');
var Event = require('./modles/event');
var User = require('./modles/user');
var session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const cookieParser = require('cookie-parser')
//route in use
const admin = require('../routes/admin');
const main = require('../routes/default');
const participant = require('../routes/participant');


const store = new MongoDBStore({
  url: uri,
  ttl: 3*60*1000,
  collection: "session"
});

// app created
var app = express();
app.use(express.static(path.join(__dirname, '../publics')));
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(cookieParser());
//app.use(cookieSession());
app.use( 
    session ({
     secret: "53cr3t50m3th1ng",
     resave: false,
     saveUninitialized: false,
     store: store,
     cookie: {
        maxAge: 3*60*1000
     }
   })
);

app.use(function(req, res, next) {
    res.locals.userid=req.session.userid;
    next();
  })
app.use('/', main);
app.use('/admin', admin);
//app.use('/admin', quiz);
//app.use('/admin', event);
app.use('/participant', participant);

const port = process.env.PORT ||3000;
app.listen(port, () => {
    console.log('Server connected with port : ' + port);
});
