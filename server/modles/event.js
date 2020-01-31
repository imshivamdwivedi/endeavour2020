const mongoose = require('mongoose');

var eventSchema =  mongoose.Schema({
    eventName: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    maxMember: {
        type: Number,
        required:true
    },
    maxRound: {
        type: Number,
        required:true
    },    
    participant_amount: {
        type: Number,
        default:null
    }
}, {
    usePushEach: true
});

eventSchema.statics.FindAllEvent = function () {
    return this.model('Event').find();
};

var Event = mongoose.model("Event", eventSchema);
//Event.create({
 //   "eventName": "Hackathon",
 //   "category": "team",
 //   "maxMember": 4,
 //   "maxRound":1
//}, {
 //   "eventName": "B-Plan",
 //   "category": "team",
 //   "maxMember": 3,
 //   "maxRound": 1
//}, {
 //   "eventName": "B-Quiz",
 //   "category": "team",
 //   "maxMember": 2,
 //   "maxRound": 3
//}, {
//   "eventName": "Co-Chess",
//    "category": "team",
//    "maxMember": 2,
//    "maxRound": 3
//}, {
//    "eventName": "Market Watch",
//    "category": "team",
//    "maxMember": 2,
//    "maxRound": 1
//}, {
 //   "eventName": "Memethon",
 //   "category": "team",
 ////   "maxMember": 2,
 //   "maxRound": 2
//},{
//    "eventName": "Your Story_Video",
//    "category": "team",
//    "maxMember": 2,
//    "maxRound": 1
//}, {
  //  "eventName": "Fantasy Premier League",
 //   "category": "team",
 //   "maxMember": 2,
 //   "maxRound": 1
//});

module.exports = {
    Event
};
