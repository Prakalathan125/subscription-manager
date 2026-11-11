import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, "Please enter a name"],
        minlength : 2,
        maxlength : 50,
        trim : true
    },
    email : {
        type : String,
        required : [true, "Please enter a email"],
        trim : true,
        unique : true,
        lowercase : true,
        match : [ /^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address"]   
    },
    password : {
        type : String,
        required : [true, "Please enter a password"],
        minlength : 6
    }
}, {timestamps : true})

const User = mongoose.model("User", userSchema);

export default User;