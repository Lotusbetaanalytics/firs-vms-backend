const Prebook = require('../Models/prebook')
const Section = require('../Models/section')
const Question = require('../Models/question')
const PrebookScore = require('../Models/prebookScore')
const ErrorResponse = require('../Utils/errorResponse')
const asyncHandler = require('../Middleware/async')

// @desc    Get all prebooks
// @route   GET    /api/v1/prebook
// @access  Private
exports.getAllPrebooks = asyncHandler(async (req, res, next) => {
    // res.status(200).json(res.advancedResults);

    const prebooks = await Prebook.find()

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
    // // Check if prebook already exists
    // const existingPrebook = await Prebook.findOne({
    //     title: req.body.title
    // })

    // if (existingPrebook) {
    //     return res.status(400).json({
    //         success: false,
    //         message: "This prebook already exists. Update it instead"
    //     })
    // }
    
    const prebook = await Prebook.create(req.body)

    if (!prebook) {
        res.status(400).json({
            success: false,
            message: "Invalid prebook details"
        })
    }
    res.status(201).json({
        success: true,
        data: prebook
    })
})

// @desc    Get prebook by token
// @route   GET    /api/v1/prebook/:token
// @access  Private
exports.getPrebookByToken = asyncHandler(async (req, res, next) => {
    const prebook = await Prebook.findOne({token: req.params.token})

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

// @desc    Get prebook by id
// @route   GET    /api/v1/prebook/:id
// @access  Private
exports.getPrebook = asyncHandler(async (req, res, next) => {
    const prebook = await Prebook.findById(req.params.id)

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
// @route   PUT    /api/v1/prebook/:id
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
// @route   DELETE    /api/v1/prebook/:id
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

// // @desc    Get all sections in a prebook
// // @route   GET    /api/v1/prebook/:prebook_id/sections
// // @access  Private
// exports.getPrebookSections = asyncHandler(async (req, res, next) => {
//     const sections = await Section.find({prebook: req.params.id})

//     if (!sections || sections.length  < 1) {
//         return res.status(404).json({
//             success: false,
//             message: "Prebook not found"
//         })
//     }
//     res.status(200).json({
//         success: true,
//         data: sections
//     })
// })

// // @desc    Get prebook assigned to the authenticated candidate
// // @route   GET    /api/v1/prebook/assigned
// // @access  Private
// exports.getAssignedPrebook = asyncHandler(async (req, res, next) => {
//     const examType = await req.candidate.examType
//     console.log(examType)
//     const assignedPrebook = await Prebook.findById(examType)
//     // const assignedPrebook = await Prebook.find({_id: examType})
//     // const sections = await Section.find({prebook: examType})

//     const existingPrebookScore = await PrebookScore.findOne({
//         candidate: req.candidate.id,
//         prebook: req.candidate.examType
//     })

//     if (existingPrebookScore && process.env.NODE_ENV === "production") {
//         return res.status(400).json({
//             success: false,
//             message: "You have taken this prebook"
//         })
//     }

//     if (!assignedPrebook) {
//         return res.status(404).json({
//             success: false,
//             message: "Assigned Prebook not found"
//         })
//     }
//     res.status(200).json({
//         success: true,
//         data: assignedPrebook
//     })
// })

// // @desc    Get all questions and sections in a prebook
// // @route   GET    /api/v1/prebook/:prebook_id/questions
// // @access  Private
// exports.getAllPrebookQuestions = asyncHandler(async (req, res, next) => {
//     const sections = await Section.find({prebook: req.params.id})
//     let questions = []
    
//     for (let i = 0; i < sections.length; i++) {
//         let section = sections[i]
//         let question = await Question.find({section: section.id}).populate({path: 'section', select: 'title timer instruction'})
//         questionSet = {
//             section: section,
//             questions: question
//         }
//         questions.push(questionSet)
//     }

//     if (!questions || questions.length  < 1) {
//         return res.status(404).json({
//             success: false,
//             message: "Prebook not found"
//         })
//     }
//     res.status(200).json({
//         success: true,
//         data: questions
//     })
// })