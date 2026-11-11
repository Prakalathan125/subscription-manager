import { JWT_SECRET } from "../config/env.js";
import User from "../models/user.models.js";
import jwt from 'jsonwebtoken'

const authorization = async(req,res,next)=>{
    try{
        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer ')){
            token = req.headers.authorization.split(' ')[1];
        }
        if(!token){
            const error = new Error("Invalid token");
            error.statusCode = 401;
            throw error;
        }
        const decode = jwt.verify(token,JWT_SECRET);
        if(!decode){
            const error = new Error("Invalid token");
            error.statusCode = 401;
            throw error;
        }
        const user = await User.findById(decode.userId);
        if(!user){
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }
        req.user = user;
        next();
    }
    catch(error){
        console.log(`Error : ${error.message}`)
        next(error);
    }
}

export default authorization;