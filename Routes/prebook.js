const express = require('express')
const advancedResults = require('../Middleware/advancedResults')
const Prebook = require('../Models/prebook')
const {
    protect,
    authorize,
    authorizeAdmin
} = require("../Middleware/auth");
const {
    getAllPrebooks,
    createPrebook,
    getPrebookByToken,
    updatePrebookByToken,
    deletePrebookByToken,
    getPrebook,
    updatePrebook,
    deletePrebook,
    // getPrebookSections,
    // getAssignedPrebook,
    // getAllPrebookQuestions
} = require('../Controllers/prebook')

const router = express.Router()

router.route('/api/v1/prebook').get(advancedResults(Prebook), getAllPrebooks)
router.route('/api/v1/prebook').post(protect, authorize, createPrebook)
// router.route('/api/v1/prebook/assigned').get(protect, getAssignedPrebook)
router.route('/api/v1/prebook/:token').get(getPrebookByToken)
router.route('/api/v1/prebook/:token').put(protect, authorize, updatePrebookByToken)
router.route('/api/v1/prebook/:token').delete(protect, authorize, deletePrebookByToken)
router.route('/api/v1/prebook/:id').get(getPrebook)
router.route('/api/v1/prebook/:id').put(protect, authorize, updatePrebook)
router.route('/api/v1/prebook/:id').delete(protect, authorize, deletePrebook)
// router.route('/api/v1/prebook/:id/sections').get(getPrebookSections)
// router.route('/api/v1/prebook/:id/questions').get(getAllPrebookQuestions)

module.exports = router
