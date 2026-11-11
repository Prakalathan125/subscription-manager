import User from "../models/user.models.js";

const getUsers = async(req,res,next)=>{
    try{
        const users = await User.find({});
        res.status(200).json({
            message : "Received",
            successful : true,
            users
        })
    }
    catch(error){
        next(error);
        console.log(`Error : ${error.message}`)
    }
}

const getUser = async(req,res,next)=>{
    try{
        const {id} = req.params;
        const user = await User.findById(id);
        if(!user){
            const error = new Error("User is not exits");
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            message : "User is found",
            successful : true,
            data : user
        })
    }
    catch(error){
        next(error);
        console.log(`Error : ${error.message}`);
    }
}

const updateUser = async(req,res,next)=>{
    try{
        const {name , email} = req.body;
        const user = await User.findOne(req.user._id);
        if(!user){
            const message = new Error("User not found");
            message.statusCode = 409;
            throw message;
        }
        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            {name,email},
            {
                returnDocument : 'after',
                runValidators : true,
                select : '-password'
            }
        )
        res.status(200).json({
            message : "User is updated",
            successful : true,
            data : updatedUser
        })
    }
    catch(error){
        next(error)
    }
}

const deleteUser = async(req,res,next)=>{
    try{
        const user = await User.findById(req.user._id);
        if(!user){
            const message = new Error("User is not found");
            message.statusCode = 409;
            throw message;
        }
        const deletedUser = await User.findByIdAndDelete(req.user._id);
        res.status(200).json({
            message : "User is deleted",
            successful : true,
            data : deletedUser
        })
    }
    catch(error){
        next(error);
    }
}


export {getUsers,getUser,updateUser,deleteUser};
