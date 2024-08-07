
const express = require('express')
const app = express();
const cors = require("cors")
const cookieParser = require("cookie-parser")
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const dotenv = require("dotenv")

dotenv.config({path:'./.env'})

const authRouter=require('./routers/authRouter')
const productRoute = require("./routers/productsRoute")
const ErrorFeature = require('./Utils/CustomError')
const globalErrorController = require('./Controllers/globalErrorController');


app.use(express.json())


  app.use(cors());
app.use("/images",express.static("Uploads"))
app.use("/auth/v1",authRouter)
app.use("/products",productRoute)

app.all('*',function(req,res,next){
    const err = new ErrorFeature(`Can't find ${req.originalUrl} on the server.`,404)
    next(err)
})

app.use(globalErrorController)

module.exports= app