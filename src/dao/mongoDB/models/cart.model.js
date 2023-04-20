import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema({
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Products"
            },
            quantity: Number,
            
        }

    ]
});

cartsSchema.pre("find",function(next){
    this.populate("products.productId");
    next()
})

export const cartsModel = mongoose.model("Carts", cartsSchema)
