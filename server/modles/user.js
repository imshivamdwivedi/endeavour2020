var mongoose = require('mongoose');

var user = mongoose.Schema({
    unique_user_id: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    auth_key: {
        type: String,
        required: true
    },
    password_hash: {
        type: String,
        // required: true
    },
    password_reset_token: {
        type: String,
        default: null
    },
    email: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        default: 1
    },
    full_name: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true,
    },
    univ_roll: {
        type: String,
        default: null
    },
    college: {
        type: String,
        require: true
    },
    participants: {
        type: Array,
        default: null
    },
    year: {
        type: Number,
        max: 5,
        required: true
    },
    branch: {
        type: String,
        require: true
    },
    caid: {
        type: String,
        required: false,
        default: null
    },
    created_at: {
        type: Date,
        default: Date.now(),
    },
    updated_at: {
        type: Date,
        default: null
    }
});

var User = mongoose.model('User', user);
module.exports = User;
