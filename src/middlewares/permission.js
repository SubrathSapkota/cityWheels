// export const ensureIsAdmin = function (req, res, next) {
//     if (!req.user) {
//       return res.status(403).json({
//         success: false,
//         message: "Please log in first",
//       })
//     } else if (req.user.userType === "admin") {
//       return next()
//     } else {
//       res.status(403).json({
//         success: false,
//         message: Operation Denied for user ${req.user.username},
//       })
//     }
//   }
