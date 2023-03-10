import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    first_name:{
        type: String,
        required:true   
        
    },

    last_name:{
        type: String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    age:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }

});

export const usersModel = mongoose.model("Users", userSchema);

