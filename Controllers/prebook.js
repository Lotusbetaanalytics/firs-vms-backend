const Prebook = require('../Models/prebook')
const User = require('../Models/user')
const ErrorResponse = require('../Utils/errorResponse')
const asyncHandler = require('../Middleware/async')
const sendMail = require('../Utils/sendEmail')
const token = require('../Utils/generateToken')


// @desc    Get all prebooks
// @route   GET    /api/v1/prebook
// @access  Private
exports.getAllPrebooks = asyncHandler(async (req, res, next) => {

    const prebooks = await Prebook.find().populate({
        path: 'host',
        select: 'id firstName lastName email department floor officeNumber'
    })

    if (!prebooks || prebooks.length < 1) {
        return res.status(404).json({
            success: false,
            message: "There are no prebooks"
        })
    }
    res.status(200).json({
        success: true,
        data: prebooks
    })
})


// @desc    Create prebook
// @route   POST    /api/v1/prebook
// @access  Private
exports.createPrebook = asyncHandler(async (req, res, next) => {

    const prebook = await Prebook.create(req.body)

    if (!prebook) {
        res.status(400).json({
            success: false,
            message: "Invalid prebook details"
        })
    }

    let prebookToken = token(6)
    let prebookCheck = await Prebook.find({token: prebookToken})

    while (prebookCheck.length >= 1) {
        prebookToken = token(6)
        prebookCheck = await Prebook.find({token: prebookToken})
    }

    prebook.token = prebookToken
    prebook.host = req.user
    prebook.save()

    let htmlMessage = `
        <p>Hello,</p>
        <p>Here are the details of the scheduled visit between ${req.user.firstName} ${req.user.lastName} and ${prebook.name} </p>
        <ul>
            <li><p>Visitor's Name: ${prebook.name}</p></li>
            <li><p>Visitor's Entry Token: ${prebook.token}</p></li>
            <li><p>Visit Date: ${prebook.date}</p></li>
            <li><p>Visit Time: ${prebook.time}</p></li>
        </ul>
        <h4>Visitors are to come with a valid ID and Visitor Entry Token.</h4>
    `
    let options = {
        email: req.user.email,
        cc: prebook.email,
        subject: "Confirmation of Visit",
        message: "Hello, you have been confirmed to visit " + req.user.firstName + " " + req.user.lastName + ". Your token is " + prebook.token,
        html: htmlMessage
    }
    await sendMail(options) // Send email with token to both parties

    res.status(201).json({
        success: true,
        data: prebook
    })
})


// @desc    Get prebook by token
// @route   GET    /api/v1/prebook/:token
// @access  Private
exports.getPrebookByToken = asyncHandler(async (req, res, next) => {

    const prebook = await Prebook.findOne({token: req.params.token}).populate({
        path: 'host',
        select: 'id firstName lastName email department floor officeNumber'
    })

    if (!prebook || !prebook.isActive) {
        return res.status(404).json({
            success: false,
            message: "You have not been prebooked"
        })
    }

    res.status(200).json({
        success: true,
        data: prebook
    })
})


// @desc    Update prebook by token
// @route   PUT    /api/v1/prebook/:token
// @access  Private
exports.updatePrebookByToken = asyncHandler(async (req, res, next) => {

    const prebook = await Prebook.findOneAndUpdate(
        {token: req.params.token},
        req.body,
        {
            new: true,
            runValidators: true,
        }
    )

    if (!prebook) {
        res.status(400).json({
            success: false,
            message: "Invalid prebook details"
        })
    }

    host = await User.findById(prebook.host)

    if (!prebook.timeIn || prebook.status == "Pending") {

        let htmlMessage = `
            <h2>Hello, ${host.firstName},</h2>
            <h4>Your visitor, ${prebook.name}, has arrived</h4>
        `
        let options = {
            email: host.email,
            subject: "Arrival of Visitor",
            message: "Hello, your visitor, " + prebook.name + " has arrived.",
            html: htmlMessage
        }
        await sendMail(options) // Send arrival email to host
    }

    timeNow = new Date().toLocaleString()

    if (!prebook.timeIn || prebook.status == "Pending") {
        prebook.timeIn = timeNow
        prebook.status = "CheckedIn"
    } else {
        prebook.timeOut = timeNow
        prebook.status = "CheckedOut"
        prebook.isActive = false
    }
    prebook.save()

    res.status(200).json({
        success: true,
        data: prebook
    })
})


// @desc    Delete prebook by token
// @route   DELETE    /api/v1/prebook/:token
// @access  Private
exports.deletePrebookByToken = asyncHandler(async (req, res, next) => {

    const prebook = await Prebook.findOneAndDelete({token: req.params.token})

    if (!prebook) {
        return res.status(404).json({
            success: false,
            message: "Prebook not found"
        })
    }
    res.status(200).json({
        success: true,
        data: {}
    })
})


// @desc    Get prebook by id
// @route   GET    /api/v1/prebooks/:id
// @access  Private
exports.getPrebook = asyncHandler(async (req, res, next) => {

    const prebook = await Prebook.findById(req.params.id).populate({
        path: 'host',
        select: 'id firstName lastName email department floor officeNumber'
    })

    if (!prebook) {
        return res.status(404).json({
            success: false,
            message: "Prebook not found"
        })
    }
    res.status(200).json({
        success: true,
        data: prebook
    })
})


// @desc    Update prebook by id
// @route   PUT    /api/v1/prebooks/:id
// @access  Private
exports.updatePrebook = asyncHandler(async (req, res, next) => {

    const prebook = await Prebook.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true,
        }
    )

    if (!prebook) {
        res.status(400).json({
            success: false,
            message: "Invalid prebook details"
        })
    }
    res.status(200).json({
        success: true,
        data: prebook
    })
})


// @desc    Delete prebook by id
// @route   DELETE    /api/v1/prebooks/:id
// @access  Private
exports.deletePrebook = asyncHandler(async (req, res, next) => {

    const prebook = await Prebook.findByIdAndDelete(req.params.id)

    if (!prebook) {
        return res.status(404).json({
            success: false,
            message: "Prebook not found"
        })
    }
    res.status(200).json({
        success: true,
        data: {}
    })
})
