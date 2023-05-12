import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
    ticketCode:{
        type:Number,
        required:true,
        unique:true
    },
    purchase_dateTime:{
        type:String
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