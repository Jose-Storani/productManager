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

        //esto deberia ser un middleware, pero por el momento lo dejamos dentro del metodo
        if (!(title, description, code, price, stock, category)) {
            return 401

        } else if (products.length !== 0 && products.some((product) => product.code === code)) {
            return 402
        }
        else{
            // let objProduct = {
            //     title,
            //     description,
            //     code,
            //     price,
            //     status,
            //     stock,
            //     category,
            //     thumbnail,
            //     id: 
            // }
            const newProduct = await productsModel.create(obj);
            return newProduct

        }
        
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

 //manejo con el servidor

 async listToShow(id) {
    let products = await this.getProducts();
    if (products.length === 0) {
        return products
    }

    else if (id) {
        // let products = await this.getProducts();
        let productsListFiltered = products.filter(u => u.id !== id);
        let productsList = productsListFiltered.map((product) => {
            let productSimplificado = {
                title: product.title,
                price: product.price
            }
            return productSimplificado
        })
        return productsList
    }
    else {
        let productsList = [];
        productsList = products.map((product) => {
            let productSimplificado = {
                title: product.title,
                price: product.price
            }
            return productSimplificado
        }
        )

        return productsList
    }

}

}



