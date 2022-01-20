const mongoose  = require("mongoose");
const Schema = mongoose.Schema;
const token = require('../Utils/generateToken')


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
        // required: true
    },
    laptop: {
        type: String,
        // required: true,
    },
    host: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        // required: true
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
        // required: true
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

// // Create token before saving
// Prebook.pre("save", async function (next) {
//     let prebookToken = token(6)

//     const prebook = await Prebook.find({token: prebookToken})

//     while (prebook.length >= 1) {
//         prebookToken = token(6)
//         prebook = await Prebook.find({token: prebookToken})
//     }

//     this.token = prebook
//     this.host = req.user

//     // TODO: create token and save it to this.token
// })

module.exports = mongoose.model('prebook', Prebook)