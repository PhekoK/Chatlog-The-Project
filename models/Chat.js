var mongoose = require('mongoose');

var chatSchema = new mongoose.Schema({
    user: [{ type: String, ref: 'User' }],
    msg: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
}, { versionKey: false });

module.exports = mongoose.model('Chat', chatSchema);