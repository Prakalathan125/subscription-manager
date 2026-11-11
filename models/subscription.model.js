import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, "Please enter a name"],
        trim : true,
        minlength : 2,
        maxlength : 250
    },
    price : {
        type : Number,
        required : [true, "Please enter a price"],
        min : [0, "Please enter a price greater than 0"]
    },
    currency : {
        type : String,
        enum : ['INR','USD','EUR'],
        default : 'INR'
    },
    frequency : {
        type : String,
        enum : ['Daily','weekly','monthly','yearly']
    },
    category : {
        type : String,
        enum: ['sports', 'news', 'entertainment', 'lifestyle', 'technology', 'finance', 'politics', 'other'],
        required : true
    },
    paymentmethod : {
        type : String,
        required : true,
        trim : true
    },
    status : {
        type : String,
        enum : ['active','inactive'],
        required : true,
        default : 'active'
    },
    startdate : {
        type : Date,
        required : true,
        validate : {
            validator : (value) => value <= new Date(),
            message : "Start date must be in past"
        }
    },
    renewaldate : {
        type : Date,
        validate : {
            validator : function (value){
                return value > this.startdate;
            }
        }
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true,
        index : true
    }
}, {timestamps : true})


const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;