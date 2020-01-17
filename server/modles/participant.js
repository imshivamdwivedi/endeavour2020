const mongoose = require('mongoose');
const User = require('./user');
const Event = require('./event');

var participantSchema = mongoose.Schema({
    head_id: {
        type: String,
        require: true,
    },
    team_id: {
        type: Array,
        require: true
    },
    event_id: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'Event'
    },
    pay_status: {
        type: Number,
        default: 0
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    updated_at: {
        type: Date,
        default: null
    }
});

var Participant = mongoose.model('Participant', participantSchema);
// Participant.create({
//     head_id:"ENDVR189452505120" ,
//     team_id: ["ENDVR189149042971","ENDVR187983041035"],
//     event_id:"5c3601e75dbe616897f55ec0"
// });
module.exports = Participant;