const mongoose= require('mongoose')
const dotenv = require('dotenv');
dotenv.config();

const mongoURI=process.env.DB_URL;

const connectToMongo=()=>{
    mongoose.connect(mongoURI);
    console.log("Successfully connected to mongo-db");

}

 module.exports= connectToMongo;