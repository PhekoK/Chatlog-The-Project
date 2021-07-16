var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    username: {type: String, required: true}, //Name & Surname, or Nickname
    email: {type: String, required: true, unique: true},
    dob: {type: String, required: true},
    phoneNumber: {type: String, required: true},
    password: {type: String, required: true},
    confirmPassword: {type: String, required: true},
    is_active: { type: Boolean, default: false } // is user currently active
}, { versionKey: false});

module.exports = mongoose.model('User', userSchema);