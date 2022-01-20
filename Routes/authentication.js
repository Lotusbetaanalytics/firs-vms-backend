const express = require('express')
const {
    userLogin,
    userLogout,
    // userAccount,
    userForgotPassword,
    userResetPassword,
} = require('../Controllers/userAuth')

const router = express.Router()

router.route("/api/v1/auth/login").post(userLogin);
router.route("/api/v1/auth/logout").post(userLogout);
router.route("/api/v1/auth/forgotPassword").post(userForgotPassword);
router.route("/api/v1/auth/resetPassword/:resettoken").post(userResetPassword);

module.exports = router
