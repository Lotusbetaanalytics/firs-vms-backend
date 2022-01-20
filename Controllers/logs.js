const express = require("express")
const asyncHandler = require("../Middleware/async")
const Prebook = require("../Models/prebook")
const User = require("../Models/user")


// @desc    Get all logs
// @route   GET    /api/v1/logs
// @access  Public
exports.getLogs = asyncHandler(async (req, res, next) => {

    // today = new Date()
    today = new Date().toLocaleDateString()
    time = new Date().toLocaleTimeString();
    const allPrebooks = await Prebook.find()
    const allPendingPrebooks = await Prebook.find({date: today, status: "Pending"})
    const allCheckedInPrebooks = await Prebook.find({date: today, status: "CheckedIn"})
    const allCheckedOutPrebooks = await Prebook.find({date: today, status: "CheckedOut"})
    const todaysPrebooks = await Prebook.find({date: today})
    const todaysPendingPrebooks = await Prebook.find({date: today, status: "Pending"})
    const todaysCheckedInPrebooks = await Prebook.find({date: today, status: "CheckedIn"})
    const todaysCheckedOutPrebooks = await Prebook.find({date: today, status: "CheckedOut"})
    
    // console.log(today + "\n" + time)
    res.status(200).json({
        success: true,
        data: {
            allPrebooks: allPrebooks,
            allPendingPrebooks: allPendingPrebooks,
            allCheckedInPrebooks: allCheckedInPrebooks,
            allCheckedOutPrebooks: allCheckedOutPrebooks,
            todaysPrebooks: todaysPrebooks,
            todaysPendingPrebooks: todaysPendingPrebooks,
            todaysCheckedInPrebooks: todaysCheckedInPrebooks,
            todaysCheckedOutPrebooks: todaysCheckedOutPrebooks,
        }
    })
})

// @desc    Get all user logs
// @route   GET    /api/v1/logs/:user_id
// @access  Public
exports.getUserLogs = asyncHandler(async (req, res, next) => {

    // today = new Date()
    today = new Date().toLocaleDateString()
    time = new Date().toLocaleTimeString();
    const allPrebooks = await Prebook.find({host: req.params.user_id})
    const allPendingPrebooks = await Prebook.find({host: req.params.user_id, status: "Pending"})
    const allCheckedInPrebooks = await Prebook.find({host: req.params.user_id, status: "CheckedIn"})
    const allCheckedOutPrebooks = await Prebook.find({host: req.params.user_id, status: "CheckedOut"})
    const todaysPrebooks = await Prebook.find({host: req.params.user_id, date: today})
    const todaysPendingPrebooks = await Prebook.find({host: req.params.user_id, date: today, status: "Pending"})
    const todaysCheckedInPrebooks = await Prebook.find({host: req.params.user_id, date: today, status: "CheckedIn"})
    const todaysCheckedOutPrebooks = await Prebook.find({host: req.params.user_id, date: today, status: "CheckedOut"})
    
    // console.log(today + "\n" + time)
    res.status(200).json({
        success: true,
        data: {
            allPrebooks: allPrebooks,
            allPendingPrebooks: allPendingPrebooks,
            allCheckedInPrebooks: allCheckedInPrebooks,
            allCheckedOutPrebooks: allCheckedOutPrebooks,
            todaysPrebooks: todaysPrebooks,
            todaysPendingPrebooks: todaysPendingPrebooks,
            todaysCheckedInPrebooks: todaysCheckedInPrebooks,
            todaysCheckedOutPrebooks: todaysCheckedOutPrebooks,
        }
    })
})