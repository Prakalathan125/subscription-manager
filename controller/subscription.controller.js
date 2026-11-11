import Subscription from "../models/subscription.model.js";



const getSubscriptions = async(req,res,next)=>{
    try{
        const users = await Subscription.find({});
        res.status(200).json({
            message : "Get all the subscription",
            data : users
        })
    }
    catch(error){
        next(error);
    }
}

const getSubscription = async(req,res,next)=>{
    try{
        const {id} = req.params;
        if(!id){
            const message = new Error("Subscription is not found");
            message.statusCode = 404;
            throw message;
        }
        const user = await Subscription.findById(id);
        res.status(200).json({
            message : "Subscription is found",
            successful : true,
            data : user
        })
    }
    catch(error){
        next(error);
    }
}


const createSubscription = async(req,res,next)=>{
    try{
        const {name,price,currency, category, paymentmethod, status, startdate, user} = req.body;
        if(!name || !price || !currency || !category || !paymentmethod || !status || !startdate || !user){
            const message = new Error("Enter all the details");
            message.statusCode = 404;
            throw message;
        }
        const subscription = await Subscription.create(req.body);
        if(!subscription){
            throw new Error("Error is occured during creation");
        }
        res.status(201).json({
            message : "User is created",
            successful : true,
            data : subscription
        })
    }
    catch(error){
        next(error);
    }
}

const updateSubscription = async(req,res,next)=>{
    try{
        const {name,price,currency, category, paymentmethod, status, startdate, user} = req.body;
        if(!name || !price || !currency || !category || !paymentmethod || !status || !startdate || !user){
            const message = new Error("Enter all the details");
            message.statusCode = 404;
            throw message;
        }
        const {id} = req.params;
        if(!id){
            const message = new Error("User is not found");
            message.statusCode = 404;
            throw message;
        }
        const updatedUser = await Subscription.findByIdAndUpdate(
            id,
            {
                name,
                price,
                currency,
                category,
                paymentmethod,
                status,
                startdate,
                user
            },
            {
                returnDocument : 'after',
                runValidators : true
            }
        );
        if(!updatedUser){
            const message = new Error("Error is occured during update");
            message.statusCode = 401;
            throw message;
        }
        res.status(200).json({
            message : "User is updated",
            successful : true,
            data : updatedUser
        })
    }
    catch(error){
        next(error);
    }
}

const deleteSubscription = async(req,res,next)=>{
    try{
        const {id} = req.params;
        if(!id){
            const message = new Error("User id is not found");
            message.statusCode = 404;
            throw error;
        }
        const deletedUser = await Subscription.findByIdAndDelete(id);
        if(!deletedUser){
            const message = new Error("Error is occured during delete subscription");
            message.statusCode = 404;
            throw message;
        }
        res.status(200).json({
            message : "Deletion is completed",
            successful : true,
            data : deletedUser
        })
    }
    catch(error){
        next(error)
    }
}

export { createSubscription, getSubscriptions, getSubscription, updateSubscription, deleteSubscription };