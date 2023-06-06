
import CustomError from "../../utils/errors/customError.js";
import { errors } from "../../utils/errors/errors.dictionary.js";
import { cartsModel } from "../mongoDB/models/cart.model.js";
import CommonMethods from "../commonMethods.js"

export default class CartManager extends CommonMethods{
    constructor(model){
        super(model)
    }

    

    async addToCart(cid, pid) {
        if(typeof cid !== "string" || typeof pid !== "string"){
            CustomError(errors.BadRequest)
        }
        const cart = await cartsModel.findById(cid);
        if (!cart) {
            CustomError(errors.NotFound);
        } else {
            if (cart.products.length) {
                const productIndex = cart.products.findIndex((e) => e.productId == pid);

                if (productIndex !== -1) {
                    let updateQ = await cartsModel.updateOne(
                        { _id: cid, "products.productId": pid },
                        { $inc: { "products.$.quantity": 1 } }
                    );
                    return updateQ;
                } else {
                    const pushProduct = cartsModel.updateOne(
                        { _id: cid },
                        {
                            $push: {
                                products: {
                                    productId: pid,
                                    quantity: 1,
                                },
                            },
                        }
                    );
                    return pushProduct;
                }
            } else {
                {
                    const pushProduct = cartsModel.updateOne(
                        { _id: cid },
                        {
                            $push: {
                                products: {
                                    productId: pid,
                                    quantity: 1,
                                },
                            },
                        }
                    );

                    return pushProduct;
                }
            }
        }
    }

    async updateQuantityByQuery(cid, pid, quantity) {
        if(typeof cid !== "string" || typeof pid !== "string" || typeof quantity !== "number"){
            CustomError(errors.BadRequest)
        }
        await this.addToCart(cid,pid);
        const filter = { _id: cid, "products.productId": pid };
        const update = { $set: { "products.$.quantity": quantity } };
        const updatedCartProduct = await cartsModel.findOneAndUpdate(
            filter,
            update,
            { new: true }
        ).lean();
        return updatedCartProduct;
    }

    async updateCartProductsByArray(cid, arrayToUpdate) {
        if(typeof cid !== "string" || !Array.isArray(arrayToUpdate)){
            CustomError(errors.BadRequest)
        }
        const updateCartProducts = await cartsModel.findOneAndReplace(
            { _id: cid },
            { products: arrayToUpdate },
            { returnDocument: "after" }
        );
        return updateCartProducts;
    }

    

    async deleteCartById(cid) {
        if(typeof cid !== "string"){
            CustomError(errors.BadRequest)
        }
        const filter = { _id: cid };
        const update = { products: [] };
        const deletedCart = await cartsModel.findOneAndUpdate(filter, update, {
            new: true,
        });
        return deletedCart;
    }

    async deleteProductCart(cid, pid) {
        
        if(typeof cid !== "string" || typeof pid !== "string"){
            CustomError(errors.BadRequest)
        }
        const Cart = await cartsModel.findById(cid);
        if (!Cart) {
            CustomError(errors.NotFound);
        }
            const productToDeleteIndex = Cart.products.findIndex(
                (e) => e.productId == pid
            );

            if (productToDeleteIndex !== -1) {
                Cart.products.splice(productToDeleteIndex, 1);
                const updatedCart = await Cart.save();
                return updatedCart;
            } else {
                return null;
            }
        
    }
}
