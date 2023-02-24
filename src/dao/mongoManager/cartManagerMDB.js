import { cartsModel } from "../models/cart.model.js";

export class CartManager {

    async getCarts() {
        try {
            const carts = await cartsModel.find();
            return carts

        } catch (error) {
            console.log("Error: ", error)
        }

    }

    async getCartbyId(cId) {
        try {
            return await cartsModel.findById(cId);

        } catch (error) {
            console.log(error)
        }
    }


    async createACart() {
        try {
            const newCart = await cartsModel.create({});
            return newCart
        } catch (error) {
            console.log("Error: ", error)
        }
    }

    //cid = cartId , pid = productId
    async addToCart(cid, pid) {
        try {
            const cart = await this.getCartbyId(cid)
            if (!cart) {
                return cart
            }

            const idProduct = cart.products.findIndex((e) => e.productId === pid);
            console.log(idProduct)
            if (idProduct !== -1) {
                let updateQ = await cartsModel.updateOne(
                    {_id: cid, "products.productId" : pid},
                    { $inc: {"products.$.quantity" : 1}}
                )
                return updateQ;
            }
            else {
                const pushProduct = cartsModel.updateOne(
                    { _id: cid },
                    {
                        $push: {
                            "products": {
                                productId: pid,
                                quantity: 1
                            }
                        }
                    }
                )
                return pushProduct;
            }

        } catch (error) {
            console.log(error)
        }
        
    }

    async deleteAllCarts() {
        const deletedCarts = await cartsModel.deleteMany();
        return deletedCarts
    }

}