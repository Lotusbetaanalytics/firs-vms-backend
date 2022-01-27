const express = require("express")
const asyncHandler = require("../Middleware/async")
const Prebook = require("../Models/prebook")
const User = require("../Models/user")


// @desc    Get all logs
// @route   GET    /api/v1/logs
// @access  Public
exports.getLogs = asyncHandler(async (req, res, next) => {

    // today = new Date().toLocaleDateString()
    today = new Date().toISOString().split('T')[0]
    time = new Date().toLocaleTimeString();
    // console.log(`\n\nTime: ${time} \n\nDate: ${today} \n\n`)
    const allStaff = await User.find() // all staff
    const allAdmin = await User.find({isAdmin: true}) // all admin
    const allPrebooks = await Prebook.find().populate({
        path: 'host',
        select: 'id firstName lastName email department floor officeNumber'
    })
    // const allPendingPrebooks = await Prebook.find({date: today, status: "Pending"}).populate({
    //     path: 'host',
    //     select: 'id firstName lastName email department floor officeNumber'
    // })
    // const allCheckedInPrebooks = await Prebook.find({date: today, status: "CheckedIn"}).populate({
    //     path: 'host',
    //     select: 'id firstName lastName email department floor officeNumber'
    // })
    // const allCheckedOutPrebooks = await Prebook.find({date: today, status: "CheckedOut"}).populate({
    //     path: 'host',
    //     select: 'id firstName lastName email department floor officeNumber'
    // })
    const todaysPrebooks = await Prebook.find({date: today}).populate({
        path: 'host',
        select: 'id firstName lastName email department floor officeNumber'
    })
    const todaysPendingPrebooks = await Prebook.find({date: today, status: "Pending"}).populate({
        path: 'host',
        select: 'id firstName lastName email department floor officeNumber'
    })
    const todaysCheckedInPrebooks = await Prebook.find({date: today, status: "CheckedIn"}).populate({
        path: 'host',
        select: 'id firstName lastName email department floor officeNumber'
    })
    const todaysCheckedOutPrebooks = await Prebook.find({date: today, status: "CheckedOut"}).populate({
        path: 'host',
        select: 'id firstName lastName email department floor officeNumber'
    })
    
    res.status(200).json({
        success: true,
        data: {
            allStaff: allStaff,
            allAdmin: allAdmin,
            allPrebooks: allPrebooks,
            // allPendingPrebooks: allPendingPrebooks,
            // allCheckedInPrebooks: allCheckedInPrebooks,
            // allCheckedOutPrebooks: allCheckedOutPrebooks,
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

    today = new Date().toLocaleDateString()
    time = new Date().toLocaleTimeString();
    const allPrebooks = await Prebook.find({host: req.params.user_id}).populate({
        path: 'host',
        select: 'id firstName lastName email department floor officeNumber'
    })
    const allPendingPrebooks = await Prebook.find({host: req.params.user_id, status: "Pending"}).populate({
        path: 'host',
        select: 'id firstName lastName email department floor officeNumber'
    })
    const allCheckedInPrebooks = await Prebook.find({host: req.params.user_id, status: "CheckedIn"}).populate({
        path: 'host',
        select: 'id firstName lastName email department floor officeNumber'
    })
    const allCheckedOutPrebooks = await Prebook.find({host: req.params.user_id, status: "CheckedOut"}).populate({
        path: 'host',
        select: 'id firstName lastName email department floor officeNumber'
    })
    const todaysPrebooks = await Prebook.find({host: req.params.user_id, date: today}).populate({
        path: 'host',
        select: 'id firstName lastName email department floor officeNumber'
    })
    const todaysPendingPrebooks = await Prebook.find({host: req.params.user_id, date: today, status: "Pending"}).populate({
        path: 'host',
        select: 'id firstName lastName email department floor officeNumber'
    })
    const todaysCheckedInPrebooks = await Prebook.find({host: req.params.user_id, date: today, status: "CheckedIn"}).populate({
        path: 'host',
        select: 'id firstName lastName email department floor officeNumber'
    })
    const todaysCheckedOutPrebooks = await Prebook.find({host: req.params.user_id, date: today, status: "CheckedOut"}).populate({
        path: 'host',
        select: 'id firstName lastName email department floor officeNumber'
    })
    
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
