const mongoose = require("mongoose")


const sessionSchema=new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  loginTime: { type: Date, default: Date.now },
  logoutTime: { type: Date },
  ipAddress: { type: String },
})

const Session = mongoose.model("Session",sessionSchema)


module.exports = Session