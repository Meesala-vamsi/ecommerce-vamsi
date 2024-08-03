
const User = require("../Models/userModel");
const asyncErrorHandler = require("../Utils/asyncErrorHandler");
const ErrorFeature = require("../Utils/CustomError");
const { createClient } = require("@supabase/supabase-js");
const dotenv = require("dotenv");
const Session = require("../Models/sessionModel");
const { MongoDBStore } = require("connect-mongodb-session");
const { ObjectId } = require("mongodb");

dotenv.config({ path: "./.env" });

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// exports.contentPermission = asyncErrorHandler(async (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   let authToken;
//   if (authHeader !== undefined) {
//     authToken = authHeader.split(" ")[1];
//   }
//   if (authToken === undefined) {
//     const error = new ErrorFeature("You are not Logged In!", 404);
//     return next(error);
//   }
//   let { data, error } = await supabase.auth.getUser(authToken);
//   if (error) {
//     const error = new ErrorFeature("Invalid JWT Token", 401);
//     return next(error);
//   }
//   const user = await User.find({supabaseId:data.id})
//   req.user = data.user
//   next()
// });

exports.restrict = async (user) => {
  const userId =  new ObjectId(user.params.id)

  const userData = await User.findById(user.params.id)
  // if (req.user.user_metadata.role === "admin") {
  //   next();
  // } else {
  //   const error = new ErrorFeature(
  //     "You don't have access to perform this action.",
  //     201
  //   );
  //   return next(error);
  // }
  console.log(userData)
  
};

exports.createUser = asyncErrorHandler(async (req, res) => {
  const { email, password, username, role } = req.body;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        role: role,
      },
    },
  });
  if (error) {
    return res.status(400).json({ error: error.message });
  }

  const users = await User.create({
    email,
    supabaseId: data.user.id,
    username,
    password,
    role,
  });
  res.status(201).json({
    status: "success",
    data: {
      users,
    },
  });
});

exports.loginUser = asyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;
  // console.log(req.body)
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return res.status(400).json({ error: error.message });
  }
  const user = await User.findOne({ email }).select("+password");
  if(!user){
    return res.status(404).json({
      login:false,
      message:"Invaid User.."
    })
  }
  req.session.userId = user._id;
  req.session.ipAddress = req.ip;
  req.session.user = user;

  await Session.create({
    userId: user._id,
    ipAddress: req.ip,
    loginTime: new Date(),
  });
  

  res.status(200).json({
    message:"User Logged In Successfully..",
    login:true,
    data:{
      user
    }
  })

});


exports.authMiddleware = asyncErrorHandler(async(req,res,next)=>{
  const sessionToken = req.cookies['connect.sid'];
  if (!sessionToken) {
    return res.status(401).json({ message: 'Not authenticated' });
  }
  // Retrieve session from MongoDB
  const session = await MongoDBStore.find({ sessionToken });
  console.log(session)
  if (!session) {
    return res.status(401).json({ message: 'Session not found' });
  }
  const user = await User.findById(session.userId);
  res.status(200).json({ user });
})

exports.getUser=asyncErrorHandler(async(req,res,next)=>{
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  const user = await User.findById(req.session.userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found',valid:false});
  }

  res.status(200).json({
    status:"Success",
    valid:true,
    data:{
      user
    }
  });
})


