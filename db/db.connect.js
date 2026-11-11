import mongoose from "mongoose";
import {DB_CONN} from '../config/env.js'

if(!DB_CONN){
    throw new Error("Please define a mongo URL");
}

const dbconnection = async(req,res)=>{
    try{
        await mongoose.connect(DB_CONN);
        console.log("Data base is connected successfully");
    }
    catch(error){
        console.log("Error is occured");
        process.exit(1);
    }
}

export default dbconnection;