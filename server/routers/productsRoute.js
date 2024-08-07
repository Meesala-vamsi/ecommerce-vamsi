const express = require("express")
const authController = require('../Controllers/authController')
const upload = require("../Storage/Storage")
const productController = require("../Controllers/productController")

const router = express.Router()

router.route("/")
    .get(authController.contentPermission,productController.getProducts)

router.route("/")
      .post(authController.contentPermission,authController.restrict,upload.single("image"),productController.createProduct)

router.route("/:id")
       .delete(authController.contentPermission,authController.restrict,productController.deleteProduct) 


  module.exports = router