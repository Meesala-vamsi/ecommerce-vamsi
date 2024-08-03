const Product = require("../Models/productModel");
const asyncErrorHandler = require("../Utils/asyncErrorHandler");
const fs = require('fs')

exports.getProducts=asyncErrorHandler(async(req,res,next)=>{
  const products = await Product.find({})
  res.status(200).json({
    status:"Success",
    data:{
      products
    }
  })
})

exports.createProduct=asyncErrorHandler(async(req,res,next)=>{
  const product = await Product.create({
    name:req.body.name,
    description:req.body.description,
    price:req.body.price,
    stock:req.body.stock,
    image:req.file.filename
  })
  console.log(product)
  res.status(201).json({
    status:"success",
    data:{
      product
    },
    message:"Product Added Successfully..."
  })
})

exports.deleteProduct=asyncErrorHandler(async(req,res,next)=>{
  await Product.findByIdAndDelete(req.params.id,{new:true,runValidators:true})
  res.status(200).json({
    status:"Success",
    message:"Product Deleted Successfully.."
  })
})