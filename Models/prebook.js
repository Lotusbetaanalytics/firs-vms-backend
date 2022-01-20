const mongoose  = require("mongoose");
const Schema = mongoose.Schema;


const Prebook = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    company: {
        type: String,
    },
    laptop: {
        type: String,
    },
    host: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
    },
    time: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    purpose: {
        type: String,
        required: true
    },
    timeIn: {
        type: Date,
    },
    timeOut: {
        type: Date,
    },
    token: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: true
    },
    status: {
        type: String,
        enum: ['Pending', 'CheckedIn', 'CheckedOut'],
        default: 'Pending'
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('prebook', Prebook)
