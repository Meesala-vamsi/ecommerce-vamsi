const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require("bcryptjs")

const userSchema =new mongoose.Schema({
    email:{
        type:String,
        validate:{
            validator:validator.isEmail,
            meesage:"Enter a valid email"
        },
        required:[true,"Email Field is Required."],
        unique:true
    },
  supabaseId: { type: String, required: true },
  username: { type: String },
  password:{type:String},
  role: { type: String, required: true, enum: ['user', 'admin'] },
},{timestamps:true})

userSchema.pre('save',async function(next){
    if(!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 10)
    this.confirmPassword = undefined
})

// userSchema.pre('findOneAndUpdate',async function(next){
//     console.log(this.password)
//     const update = this.getUpdate()
//     if(update.password){    
//         const hashedPassword= await bcrypt.hash(update.password, 10)
//         update.password =hashedPassword
//         update.passwordCreatedAt=new Date()
//         this.confirmPassword = undefined
//     }
//     next()
// })


userSchema.methods.comparePasswordInDb=async function(pass,passDB){
    return await bcrypt.compare(pass,passDB)
}

// userSchema.methods.isPasswordChanged=async function(JWTTimeStamp){
//     if(this.passwordCreatedAt){
//         const changePasswordInToTime=(this.passwordCreatedAt.getTime()/1000)
//         console.log(JWTTimeStamp < changePasswordInToTime);
//         return JWTTimeStamp < changePasswordInToTime
//     }
//     return false
// }

// userSchema.methods.passwordResetToken= function(){
//         const randomToken = crypto.randomBytes(22).toString('hex')
//         this.randomPasswordToken=crypto.createHash('sha256').update(randomToken).digest('hex')
//         this.randomPasswordTokenExpiry = Date.now() + 10 * 60 * 1000
//         console.log(randomToken,this.randomPasswordToken);
//         return randomToken
// }

const User = mongoose.model('User',userSchema);
module.exports=User