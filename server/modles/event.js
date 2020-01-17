const mongoose = require('mongoose');

var eventSchema = new mongoose.Schema({
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
Event.create({
    "eventName": "Hackathon",
    "category": "team",
    "maxMember": 4,
    "maxRound":1
}, {
    "eventName": "B-Plan",
    "category": "team",
    "maxMember": 2,
    "maxRound": 1
}, {
    "eventName": "B-Noesis",
    "category": "team",
    "maxMember": 2,
    "maxRound": 3
}, {
    "eventName": "Maestro",
    "category": "single",
    "maxMember": 2,
    "maxRound": 3
}, {
    "eventName": "Bid-It",
    "category": "team",
    "maxMember": 2,
    "maxRound": 1
}, {
    "eventName": "Dropout",
    "category": "team",
    "maxMember": 2,
    "maxRound": 2
}, {
    "eventName": "Start Up Challenge",
    "category": "team",
    "maxMember": 2,
    "maxRound": 1
}, {
    "eventName": "Your Story_Video",
    "category": "team",
    "maxMember": 2,
    "maxRound": 1
}, {
    "eventName": "Your Story_Photo",
    "category": "team",
    "maxMember": 2,
    "maxRound": 1
}, {
    "eventName": "Art of Conquest",
    "category": "team",
    "maxMember": 2,
    "maxRound": 1
});

module.exports = {
    Event
};
