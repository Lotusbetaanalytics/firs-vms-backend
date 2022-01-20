const express = require('express')
const advancedResults = require('../Middleware/advancedResults')
const Prebook = require('../Models/prebook')
const {
    getAllPrebooks,
    createPrebook,
    getPrebookByToken,
    updatePrebookByToken,
    deletePrebookByToken,
    getPrebook,
    updatePrebook,
    deletePrebook,
} = require('../Controllers/prebook')
const {
    protect,
    authorize,
    // authorizeAdmin
} = require("../Middleware/auth");

const router = express.Router()

router.route('/api/v1/prebook').get(advancedResults(Prebook), getAllPrebooks)
router.route('/api/v1/prebook').post(protect, authorize, createPrebook)
router.route('/api/v1/prebook/:token').get(getPrebookByToken)
router.route('/api/v1/prebook/:token').put(protect, authorize, updatePrebookByToken)
router.route('/api/v1/prebook/:token').delete(protect, authorize, deletePrebookByToken)
router.route('/api/v1/prebooks/:id').get(getPrebook)
router.route('/api/v1/prebooks/:id').put(protect, authorize, updatePrebook)
router.route('/api/v1/prebooks/:id').delete(protect, authorize, deletePrebook)

module.exports = router
