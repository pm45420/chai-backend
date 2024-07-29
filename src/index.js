// dot env waala sabse pahel likh dena hota hai//
//require('dotenv').config({path: './env'})//
//import dotenv from 'dotenv';//
//import mongoose from "mongoose";//
////
//import {} from 'dotenv/config';//
//import dotenv from "dotenv";//
import 'dotenv/config';
import express from "express";
 import connectDB from "./db/index.js";
 import {app} from './app.js'
 //const app = express();
 
//dotenv.config();

/*dotenv.config({
    path: './env'
 })*/
 

connectDB()
.then(()=>{
    app.listen(process.env.PORT|| 8000, ()=>{
        console.log(`Server is running at port :${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log("MONGO db connection failed !!!",err);
})


/*import express from "express";
const app=express();

(async() => {
    try{
     await  mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
     app.on("error",(error)=>{
        console.log("ERRR:",error);
        throw error
     })
     app.listen(process.env.PORT,()=>{
        console.log(`App is listening on port ${process.env.PORT}`)
     })

    }
    catch(error){
        console.error("ERROR :", error)
        throw err
    }
           
    
    throw err
})() */