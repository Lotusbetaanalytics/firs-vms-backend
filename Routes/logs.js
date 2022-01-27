const express = require('express')
const {
    getLogs,
    getUserLogs
} = require('../Controllers/logs')
const {
    protect,
    authorize,
    // authorizeAdmin
} = require("../Middleware/auth");

const router = express.Router()

router.route('/api/v1/logs').get(protect, authorize, getLogs)
router.route('/api/v1/logs/:user_id').get(protect, authorize, getUserLogs)

module.exports = router
