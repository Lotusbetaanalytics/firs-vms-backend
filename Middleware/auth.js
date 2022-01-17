const jwt = require("jsonwebtoken");
const asyncHandler = require("./async");
const ErrorResponse = require("../Utils/errorResponse");
const User = require("../Models/user");

// // Protect routes
// exports.protect = asyncHandler(async (req, res, next) => {
//   let token;

//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     // Set token from Bearer token in header
//     token = req.headers.authorization.split(" ")[1];
//     // Set token from cookie
//   } else if (req.cookies.token) {
//     token = req.cookies.token;
//   }

//   // Make sure token exists
//   if (!token) {
//     return next(new ErrorResponse("Not authorized to access this route", 401));
//   }

//   try {
//     // Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     req.user = await User.findById(decoded.id);

//     next();
//   } catch (err) {
//     return next(new ErrorResponse("Not authorized to access this route", 401));
//   }
// });

// // Grant access to specific roles
// exports.authorize = (...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.staff.role)) {
//       return next(
//         new ErrorResponse(
//           `User role ${req.staff.role} is not authorized to access this route`,
//           403
//         )
//       );
//     }
//     next();
//   };
// };

// // Grant access to authenticated user
// exports.authorize = () => {
//   return (req, res, next) => {
//     if (!req.user || !req.candidate) {
//       return next(
//         new ErrorResponse(
//           `User is not authorized to access this route`,
//           403
//         )
//       );
//     }
//     next();
//   };
// };

// Grant access to authenticated user
exports.authorize = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    return next(
      new ErrorResponse(
        `User is not authorized to access this route`,
        403
      )
    );
  } 
  
};

// // Grant access to user
// exports.authorizeUser = () => {
//   return (req, res, next) => {
//     if (!req.user) {
//       return next(
//         new ErrorResponse(
//           `User is not authorized to access this route`,
//           403
//         )
//       );
//     }
//     next();
//   };
// };

// Grant access to admin
exports.authorizeAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(
      new ErrorResponse(
        `User is not authorized to access this route`,
        403
      )
    );
  }
  next();
};

// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // Set token from Bearer token in header
    token = req.headers.authorization.split(" ")[1];
    // Set token from cookie
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }

  // Make sure token exists
  if (!token) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }

  // try {
  //   // Verify token
  //   const decoded = jwt.verify(token, process.env.JWT_SECRET);

  //   req.user = await User.findById(decoded.id)

  //   next();
  // } catch (err) {

  //   try {
  //     // Verify token
  //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
  //     req.candidate = await Candidate.findById(decoded.id);
  
  //     next();
  //   } catch (err) {
  //     return next(new ErrorResponse("Not authorized to access this route", 401));
  //   }

  //   return next(new ErrorResponse("Not authorized to access this route", 401));
  // }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);

  if (req.user) {
    next();
  } else {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }

  
});
