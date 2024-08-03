const mongoose = require("mongoose")

const productSchema=new mongoose.Schema({
  name:{
    type:String,
    required:[true,"Name field is required"],
    unique:true
  },
  description:{
    type:String
  },
  price:{
    type:Number
  },
  stock:{
    type:Number
  },
  image:{
    data:Buffer,
    type:String,
    required:[true,"image field is required"],
    default:"default product.jpeg"
},
},{timestamps:true})

const Product=mongoose.model('Product',productSchema)

module.exports = Product