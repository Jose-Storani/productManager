import { cartsModel } from "../models/cart.model.js";

export class CartManager {
    async getCarts() {
        try {
            const carts = await cartsModel.find({});
            return carts;
        } catch (error) {
            console.log("Error: ", error);
        }
    }

    async getCartbyId(cId) {
        try {
            return await cartsModel.find({ _id: cId });
        } catch (error) {
            console.log(error);
        }
    }

    async createACart() {
        try {
            const newCart = await cartsModel.create({});
            return newCart;
        } catch (error) {
            console.log("Error: ", error);
        }
    }

    //cid = cartId , pid = productId
    async addToCart(cid, pid) {
        try {
            const cart = await this.getCartbyId(cid);
            if (!cart) {
                return cart;
            }
            if (cart.products !== undefined) {
                const idProduct = cart.products.findIndex((e) => e.productId === pid);

                if (idProduct !== -1) {
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
            } 

            else 
            {
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
        } catch (error) {
            console.log(error);
        }
    }

    async deleteAllCarts() {
        const deletedCarts = await cartsModel.deleteMany();
        return deletedCarts;
    }

    async deleteCartById(cid){
        try {
            const filter = {_id:cid};
            const update = {products:[]};
            const deletedCart = await cartsModel.findOneAndUpdate(filter,update);
            return deletedCart
        } catch (error) {
            console.log(error)
        }
    }

    async deleteProductCart(cid, pid) {
        try {
            const idCart = this.getCartbyId(cid);
            if (idCart) {
                const idPrdc = idCart.products.findIndex(
                    (element) => element.productId === pid
                );
                if (idPrdc !== -1) {
                    const CartToDelete = await cartsModel.deleteOne({ "products.productId": pid });
                    return CartToDelete;
                }
            }
        } catch (error) {
            console.log("Producto de Carrito no encontrado", error);
        }
    }
}
