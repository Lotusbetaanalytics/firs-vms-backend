const User = require('../Models/user')
const {ErrorResponseJSON} = require('../Utils/errorResponse')
const asyncHandler = require('../Middleware/async')


// @desc    Get all users
// @route   GET     /api/v1/users
// @access  Public
exports.getAllUsers = asyncHandler(async (req, res, next) => {

    const users = await User.find()

    if (!users || users.length < 1) {
        return res.status(404).json({
            success: false,
            message: "There are no users"
        })
    }
    res.status(200).json({
        success: true,
        data: users
    })
})


// @desc    Create user
// @route   POST    /api/v1/auth
// @access  Private
exports.createUser = asyncHandler(async (req, res, next) => {

    const existingUser = await User.findOne({
        email: req.body.email
    })

    if (existingUser) {
        return res.status(400).json({
            success: false,
            message: "This account already exists, log in instead"
        })
    }

    const user = await User.create(req.body)

    if (!user) {
        return next(new ErrorResponse(res, "Invalid user credentials", 400));
    }
    res.status(201).json({
        success: true,
        data: user
    })
})


// @desc    Get user
// @route   GET     /api/v1/auth/:id
// @access  Private
exports.getUser = asyncHandler(async (req, res, next) => {

    const user = await User.findById(req.params.id)

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        })
    }
    res.status(200).json({
        success: true,
        data: user
    })
})


// @desc    Update user
// @route   PUT    /api/v1/auth/:id
// @access  Private
exports.updateUser = asyncHandler(async (req, res, next) => {

    const user = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true,
        }
    )

    if (!user) {
        return res.status(400).json({
            success: false,
            message: "Invalid user details"
        })
    }
    res.status(200).json({
        success: true,
        data: user
    })
})


// @desc    Delete user
// @route   DELETE    /api/v1/auth/:id
// @access  Private
exports.deleteUser = asyncHandler(async (req, res, next) => {

    const user = await User.findByIdAndDelete(req.params.id)

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        })
    }
    res.status(200).json({
        success: true,
        data: {}
    })
})


// @desc    Get currently authenticated user
// @route   GET    /api/v1/auth
// @access  Private
exports.getSelf = asyncHandler(async (req, res, next) => {

    const user = await User.findById(req.user._id)

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        })
    }
    res.status(200).json({
        success: true,
        data: user
    })
})


// @desc    Get currently authenticated user
// @route   PUT    /api/v1/auth
// @access  Private
exports.updateSelf = asyncHandler(async (req, res, next) => {

    const user = await User.findByIdAndUpdate(
        req.user._id,
        req.body,
        {
            new: true,
            runValidators: true,
        }
    )

    if (!user) {
        return res.status(400).json({
            success: false,
            message: "Invalid user details"
        })
    }
    res.status(200).json({
        success: true,
        data: user
    })
})


// @desc    Upload profile picture for user
// @route   POST    /api/v1/user/upload-profile
// @access  Private
exports.uploadProfilePicture = asyncHandler(async (req, res, next) => {

    if (!req.files) {
      return next(new ErrorResponse(res, `Please Upload a picture`, 400));
    }
  
    const file = req.files.file;
    // Make sure the image is a photo
    if (!file.mimetype.startsWith("image")) {
      return next(new ErrorResponse(res, `Please Upload an image file`, 400));
    }
  
    // Check filesize
    if (file.size > process.env.MAX_FILE_UPLOAD) {
      return next(new ErrorResponse(res, `Please Upload an image less than 5MB`, 400));
    }

    // Confirm user user is authenticated
    if (!req.user) {
        return res.status(401).json({
            success: false,
            message: "You are not authenticated, Please login"
        })
    }
  
    //create custom filename
    file.name = `logo_${req.user.lastName}${path.parse(file.name).ext}`;
  
    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
      if (err) {
        console.error(err);
        return next(new ErrorResponse(res, `An error occured while uploading`, 500));
      }
      userImage = await User.findByIdAndUpdate(req.user.id, { image: file.name });
      if (!userImage) {
        return next(new ErrorResponse(res, "An Error Occured, Please Tray Again", 400));
      }
      res.status(200).json({
        success: true,
        data: file.name,
      });
    });
});
