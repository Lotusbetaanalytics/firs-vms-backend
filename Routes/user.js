const express = require('express')
const advancedResults = require('../Middleware/advancedResults')
const User = require('../Models/user')
const {
    getAllUsers,
    createUser,
    getUser,
    updateUser,
    deleteUser,
    getSelf,
    updateSelf,
    // uploadProfilePicture
} = require('../Controllers/user')
const {
    protect,
    authorize,
    authorizeAdmin
} = require("../Middleware/auth");

const router = express.Router()

router.route('/api/v1/users').get(advancedResults(User), getAllUsers)
router.route('/api/v1/auth').post(createUser)
router.route('/api/v1/auth').get(protect, authorize, getSelf)
router.route('/api/v1/auth').put(protect, authorize, updateSelf)
// router.route('/api/v1/auth/upload-profile').post(protect, authorizeAdmin, uploadProfilePicture)
router.route('/api/v1/auth/:id').get(protect, authorizeAdmin, getUser)
router.route('/api/v1/auth/:id').put(protect, authorizeAdmin, updateUser)
router.route('/api/v1/auth/:id').delete(protect, authorizeAdmin, deleteUser)

module.exports = router
