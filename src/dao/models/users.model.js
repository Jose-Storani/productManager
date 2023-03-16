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
        required:true,
        default:0
    },
    password:{
        type:String,
        required:true
    },
    rol:{
        type:String,
        default:"Usuario"
    }

});

export const usersModel = mongoose.model("Users", userSchema);

