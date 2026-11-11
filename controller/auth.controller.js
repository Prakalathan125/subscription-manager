import User from '../models/user.models.js';
import { JWT_SECRET,JWT_EXPIRES_IN } from '../config/env.js';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'

const signup = async(req,res,next)=>{
        const session = await mongoose.startSession();
        await session.startTransaction();
    try{
        const {name , email, password} = req.body;
        const existingUser = await User.findOne({email});
        if(existingUser){
            const error = new Error("Already user exists");
            error.statusCode = 409;
            throw error;
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        const users = await User.create([{name,email, password : hashedPassword}], {session});
        const token = jwt.sign({userId : users[0]._id},JWT_SECRET , {expiresIn : JWT_EXPIRES_IN});
        res.status(201).json({message : "User is created Successfully",
            "Token" : token, users
        })
        await session.commitTransaction();
        await session.endSession();
    }
    catch(error){
        session.abortTransaction();
        session.endSession();
        next(error);
    }
}

const signin = async(req,res,next)=>{
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            const error = new Error("User is not exists");
            error.statusCode = 404;
            throw error;
        }
        const vaildPassword = await bcrypt.compare(password,user.password);
        if(!vaildPassword){
            const error = new Error("Password is incorrect");
            error.statusCode = 401;
            throw error;
        }
        const token = jwt.sign({userId : user._id},JWT_SECRET,{expiresIn : JWT_EXPIRES_IN});
        res.status(200).json({
            message : "You signed in",
            token,
            user
        })

    }
    catch(error){
        next(error);
    }
}

export {signup, signin};