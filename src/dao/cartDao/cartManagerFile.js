import fs from "fs"
import { __dirname } from "../../utilities.js"

export default class CartManager {
    constructor() {
        
        this.pathCart = __dirname + "/files/carrito.json";
    }

    async getCart() {
        if (fs.existsSync(this.pathCart)) {
            let cartFile = await fs.promises.readFile(this.pathCart, "utf-8");
            return JSON.parse(cartFile)
        }
        else {
            return []
        }

    }

    async #generarIdCart() {
        let id = 1;
        const cartFile = await this.getCart()
        if (cartFile.length !== 0) {
            id = cartFile[cartFile.length - 1].id + 1;
        }
        return id;
    }

    async createACart() {
        const cartFile = await this.getCart();
        let newCart = {
            id: await this.#generarIdCart(),
            products: []
        }

        cartFile.push(newCart);
        await fs.promises.writeFile(this.pathCart, JSON.stringify(cartFile))
        return newCart

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
            let productFound= cartToUpdate["products"].find(product => product.id === pid);
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



        await fs.promises.writeFile(this.pathCart, JSON.stringify(cartFile))
        return cartToUpdate
    }

}