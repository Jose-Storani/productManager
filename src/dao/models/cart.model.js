import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema({
    products:
        {    type:Array, 
            productId: String, 
            quantity: Number }
    
        
    
    

});

export const cartsModel = mongoose.model("Carts",cartsSchema)
// const m = new cartsModel({products:[{productId:"12345",quantity: 54}]});

// console.log(m)