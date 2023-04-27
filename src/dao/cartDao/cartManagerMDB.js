import { cartsModel } from "../mongoDB/models/cart.model.js";

export default class CartManager {
    async getCarts() {
        try {
            const carts = await cartsModel.find({}).lean();
            return carts;
        } catch (error) {
            console.log("Error: ", error);
        }
    }

    async getCartbyId(cId) {
        try {
            const cartFounded =  await cartsModel.find({_id:cId}).lean()
            return cartFounded
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

    
    async addToCart(cid, pid) {
        try {
            const cart = await cartsModel.findById(cid);           
            if (!cart) {
                return cart;
            }
            else{
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
            }
           
        } catch (error) {
            console.log(error);
        }
    }

    async updateQuantityByQuery(cid,pid,quantity){
        try {
            const filter = {_id:cid, "products.productId":pid};
            const update = { $set: {"products.$.quantity": quantity}}
            const updatedCartProduct = await cartsModel.findOneAndUpdate(filter,update,{new:true});
            return updatedCartProduct
        } catch (error) {
            console.log(error)
        }
    }

    async updateCartProductsByArray(cid,arrayToUpdate){
        try {
            let arrayTest= [{
                productId:"644713dc53a7ea768d5c6de6",
                quantity:10
            }]
            const updateCartProducts = await cartsModel.findOneAndReplace({_id:cid},{products:arrayToUpdate},{returnDocument:"after"});
            return updateCartProducts
        } catch (error) {
            console.log(error)
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
            const deletedCart = await cartsModel.findOneAndUpdate(filter,update,{new:true});
            return deletedCart
        } catch (error) {
            console.log(error)
        }
    }

    async deleteProductCart(cid, pid) {
        try {
            const idCart = await cartsModel.findById(cid);
            
            if (idCart !== undefined) {
                //triple comparacion no funciona, tal vez por el params ser string y otro un objectID
                const productToDeleteIndex = idCart.products.findIndex(e => e.productId == pid)
                
                if (productToDeleteIndex !== -1) {
                    idCart.products.splice(productToDeleteIndex,1);
                    const updatedCart = await idCart.save()
                    return updatedCart
                }
                else{
                    return undefined
                }
            }
            else{
                return idCart
            }
        } catch (error) {
            console.log("Producto de Carrito no encontrado", error);
        }
    }
}
