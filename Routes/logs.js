const express = require('express')
const advancedResults = require('../Middleware/advancedResults')
const {
    protect,
    authorize,
    authorizeAdmin
} = require("../Middleware/auth");
const {
    getLogs,
    getUserLogs
} = require('../Controllers/logs')

const router = express.Router()

router.route('/api/v1/logs').get(getLogs)
router.route('/api/v1/logs/:user_id').get(getUserLogs)
// router.route('/api/v1/logs').post(protect, authorize, createPrebook)
// router.route('/api/v1/logs/:token').get(getPrebookByToken)
// router.route('/api/v1/logs/:token').put(protect, authorize, updatePrebookByToken)
// router.route('/api/v1/logs/:token').delete(protect, authorize, deletePrebookByToken)
// router.route('/api/v1/logs/:id').get(getPrebook)
// router.route('/api/v1/logs/:id').put(protect, authorize, updatePrebook)
// router.route('/api/v1/logs/:id').delete(protect, authorize, deletePrebook)

module.exports = router
