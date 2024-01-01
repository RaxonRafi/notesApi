const express = require('express');
const app = new express();
const router = require('./src/routes/api');



// Security module import

const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet')
const hpp = require('hpp')
const cors = require('cors')
const xss = require('xss-clean')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
// Security module implement
app.use(cors())
app.use(mongoSanitize())
app.use(helmet())
app.use(hpp())
app.use(xss())
app.use(bodyParser.json())

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, 
	max: 100, 
	standardHeaders: true,
	legacyHeaders: false, 
})

app.use(limiter)

// MongoDB Connection

let uri = "mongodb+srv://<username>:<password>@cluster0.kztr9ii.mongodb.net/?retryWrites=true&w=majority"
let options = {user:'devmuhammadrafi',pass:'fRCi16SERoWGdhzy'}
mongoose.set("strictQuery", false);

const connectToMongoDB = async () => {
	try {
	  await mongoose.connect(uri, options);
	  console.log("Connected!");
	} catch (error) {
	  console.error(error);
	}
  };
  
  // Call the function to connect to MongoDB
  connectToMongoDB();
  
app.use("/api/v1",router)
app.use('*',(req,res)=>{
	
    res.status(404).json({status:"fail", message:"Invalid URL"})
})

module.exports = app;