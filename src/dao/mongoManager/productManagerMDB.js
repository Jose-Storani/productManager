import { productsModel } from "../models/products.model.js";

export class ProductManager {
   async getProducts(){
    try {
        const products = await productsModel.find();
        return products
        
    } catch (error) {
        console.log("Error: ", error);
    }
}

async addProduct(obj){
    try {
        const products = await this.getProducts()
        const {title, description, code, price, status = true, stock, category, thumbnail = []} = obj;
        if (!(title, description, code, price, stock, category)) {

            return 401

        } else if (products.length !== 0 && products.some((product) => product.code === code)) {
            // res.status(400).send("EL CODIGO NO PUEDE SER IGUAL")
            return 402
        }
        const newProduct = await productsModel.create(obj);
        return newProduct
    } catch (error) {
        console.log(error)
        
    }
}

async getProductById(id){
    try {
        const product = await productsModel.findById(id)
        return product
    } catch (error) {
        console.log(error)
    }
}



async deleteById(){
    try {
        const deletedProduct = await productsModel.findByIdAndDelete(id);
        return deletedProduct
    } catch (error) {
        console.log(error)
    }
}

}



