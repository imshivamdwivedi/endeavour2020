const mongoose = require('mongoose');
var config = require('./config');

const url = config.mongoUrl;
const connect = mongoose.connect(url);

connect.then((db) => {
    console.log("Connected correctly to datbase");
}, (err) => { console.log(err); });
