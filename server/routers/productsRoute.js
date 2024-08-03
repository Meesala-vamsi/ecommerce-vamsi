const express = require("express")
const authController = require('../Controllers/authController')
const upload = require("../Storage/storage")
const productController = require("../Controllers/productController")

const router = express.Router()

router.route("/")
    .get(productController.getProducts)

router.route("/")
      .post(upload.single("image"),productController.createProduct)

router.route("/:id")
       .delete(productController.deleteProduct) 


  module.exports = router