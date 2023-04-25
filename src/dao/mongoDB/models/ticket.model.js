import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
    ticketCode:{
        type:String,
        required:true,
        unique:true
    },
    purchase_dateTime:{
        type:Date,
        default:Date.now
    }
    ,
    amount:{
        type:Number,
        required:true
    },
    purchaser:{
        type:String,

    }
})

export const ticketModel = mongoose.model("Ticket",ticketSchema)