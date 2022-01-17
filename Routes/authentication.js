const express = require('express')
const advancedResults = require('../Middleware/advancedResults')
// User model and auth controller
const User = require('../Models/user')
const {
    userLogin,
    userLogout,
    // userAccount,
    userForgotPassword,
    userResetPassword,
} = require('../Controllers/userAuth')

const {
    protect,
    authorize,
    authorizeAdmin
} = require("../Middleware/auth");

const router = express.Router()

router.route("/api/v1/auth/login").post(userLogin);
// router.route("/api/v1/auth/addEmail").post(addEmail);
// router.route("/api/v1/auth/verifyEmail").post(verifyEmail);
router.route("/api/v1/auth/logout").post(userLogout);
// router.route("/api/v1/auth/account").get(protect, authorizeAdmin, userAccount);
router.route("/api/v1/auth/forgotPassword").post(userForgotPassword);
router.route("/api/v1/auth/resetPassword/:resettoken").post(userResetPassword);

// router.route("/api/v1/auth/").post(login);
// // router.route("/api/v1/auth/addEmail").post(addEmail);
// // router.route("/api/v1/auth/verifyEmail").post(verifyEmail);
// router.route("/api/v1/auth/logout").post(logout);
// router.route("/api/v1/auth/account").get(protect, authorize, account);
// router.route("/api/v1/auth/forgotPassword").post(forgotPassword);
// router.route("/api/v1/auth/resetPassword/:resettoken").post(resetPassword);

module.exports = router