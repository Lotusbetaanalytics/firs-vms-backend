const { ObjectId } = require("bson");
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
        required: true
    },
    laptop: {
        type: String,
        required: true,
    },
    host: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: true
    },
    time: {
        type: Date,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    purpose: {
        type: String,
        required: true
    },
    timeIn: {
        type: Date,
        required: true
    },
    timeOut: {
        type: Date,
    },
    token: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Checked in', 'Checked out'],
        default: 'Pending'
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Create token before saving
Prebook.pre("save", async function (next) {
    // TODO: create token and save it to this.token
})

module.exports = mongoose.model('prebook', Prebook)