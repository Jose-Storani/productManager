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
    associatedCart:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Carts",
        
        
    },

    rol:{
        type:String,
        default:"Usuario"
    }

});

userSchema.pre("findOne",function(next){
    this.populate("associatedCart");
    next()
})

export const usersModel = mongoose.model("Users", userSchema);

