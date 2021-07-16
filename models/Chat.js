var mongoose = require('mongoose');

var chatSchema = new mongoose.Schema({
    user: [ 
        { type: mongoose.Schema.ObjectId, ref: 'User' }
    ], //name of user who sent you the message
    msg: { type: String, required: true}, //
    created_at: { type: Date, default: Date.now}
}, { versionKey: false});

module.exports = mongoose.model('Chat', chatSchema);