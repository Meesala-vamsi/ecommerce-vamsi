const express = require('express')
const UserController = require('../Controllers/authController')

let router = express.Router()
router.route('/signup')
      .post(UserController.createUser) 

router.route('/login')
      .post(UserController.loginUser)

router.route("/user")
      .get(UserController.getUser)

// router.route("/updatePassword")
//       .patch(UserController.contentPermission,UserController.passwordUpdate)

// router.route('/forgotPassword')
//       .post(UserController.forgotPassword)

// router.route('/resetPassword/:token')
//       .patch(UserController.resetPassword)
// router.route('/updateUserDetails')
//       .patch(UserController.contentPermission,UserController.updateUserDetails)



module.exports = router