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


    async createACart() {
        try {            
            const newCart = await cartsModel.create({});
            console.log(newCart)
            return newCart
            
        } catch (error) {
            console.log("Error: ", error)
        }
        

    }

    //cid = cartId , pid = productId
    async addToCart(cid, pid) {
        let cartFile = await this.getCart();
        let cartToUpdate = cartFile.find(element => element.id === cid) ?? 400;
        if (cartToUpdate === 400) {
            return cartToUpdate
        }
        //busco el producto que coincida con el productoID dentro del carrito ya seleccionado, si ya existe, le sumo 1.
        else if (cartToUpdate["products"].some(product => product.id === pid)) {
            let productFound = cartToUpdate["products"].find(product => product.id === pid);
            productFound["quantity"]++


        }
        //si no existe, lo creo
        else {
            let productCart = {
                id: pid,
                quantity: 1
            }
            cartToUpdate["products"].push(productCart);
        }



        
        return cartToUpdate
    }

    async deleteAllCarts (){
        const deletedCarts = await cartsModel.deleteMany();
        return deletedCarts
    }

}