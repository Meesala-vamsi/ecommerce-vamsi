
const express = require('express')
const app = express();
const cors = require("cors")
const cookieParser = require("cookie-parser")
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const dotenv = require("dotenv")

dotenv.config({path:'./.env'})
// const moviesRouter = require('./routers/moviesRoute')
const authRouter=require('./routers/authRouter')
const productRoute = require("./routers/productsRoute")
const ErrorFeature = require('./Utils/CustomError')
const globalErrorController = require('./Controllers/globalErrorController');


const store = new MongoDBStore({
    uri: process.env.CONN_STRING,
    collection: 'sessions',
  });

app.use(express.json())
app.use(cookieParser())
app.use(
    session({
        secret:process.env.SESSION_SECRET,
        resave:false,
        saveUninitialized:false,
        store:store,
        cookie:{
            httpOnly:true,
            maxAge: 1000 * 60 * 60 * 24 
        }
    })
)
const corsOptions = {
    origin: 'https://master--vamsimees-ecommerce.netlify.app', // Replace with your frontend's origin
    credentials: true // This allows the session cookie to be sent back and forth
  };
  app.use(cors(corsOptions));
app.use("/images",express.static("Uploads"))
app.use("/auth/v1",authRouter)
app.use("/products",productRoute)
// app.use('/movies',moviesRouter)
// app.use('/user',authRouter)
app.all('*',function(req,res,next){
    const err = new ErrorFeature(`Can't find ${req.originalUrl} on the server.`,404)
    next(err)
})

app.use(globalErrorController)

module.exports= app