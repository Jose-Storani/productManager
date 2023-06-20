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
    },
		relatedProducts: [
			{
				productId: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Products"
			},
			quantity: Number
			}
		]
})

ticketSchema.pre("findOne",function(next){
	this.populate("relatedProducts.productId");
	next()
})

export const ticketModel = mongoose.model("Ticket",ticketSchema)