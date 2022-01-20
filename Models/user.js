const mongoose  = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")
const Schema = mongoose.Schema


const User = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        minLength: 6,
        required: true,
        select: false
    },
    image: {
        type: String,
    },
    department: {
        type: String,
        required: true
    },
    floor: {
        type: String,
        required: true
    },
    officeNumber: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
})


//Encrypt password using bcrypt
User.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})
  
//Sign JWT and return
User.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    })
}
  
//match user entered password to hashed password in db
User.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

// REset Password
User.methods.getResetPasswordToken = function () {
    //Generate token
    const resetToken = crypto.randomBytes(20).toString("hex")
    //Hash token and set to resetPasswordToken field
    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex")
  
    //set expire
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000
    return resetToken
}

module.exports = mongoose.model('user', User)
