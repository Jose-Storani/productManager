import { productsModel } from "../mongoDB/models/products.model.js";

export default class ProductManager {
    async getProducts() {
        try {
            return await productsModel.find({}).lean();
            
        }
        catch (error) {
            console.log("Error: ", error);
        }
    }

    async addProduct(obj) {
        try {
            const products = await this.getProducts()
            const { title, description, code, price, status = true, stock, category, thumbnail = [] } = obj;
            //esto deberia ser un middleware, pero por el momento lo dejamos dentro del metodo
            if (!(title, description, code, price, stock, category)) {
                return 401
            } else if (products.length !== 0 && products.some((product) => product.code === code)) {
                return 402
            }
            else {
               
                return await productsModel.create(obj);
                
            }
        } catch (error) {
            console.log(error)
        }
    }

    async aggregationFunc(ctg, srt) {
        try {
            if(!ctg) {
                return {message:"Producto no encontrado"}
            } else {
                const ctgy = await productsModel.aggregate([
                    {   
                        $match: {category: {$eq: `${ctg}`}, price: {$exists:true}}
                    },
                    {
                        $sort: {price: srt}
                    }
                ])
                return ctgy;
            }
        } catch (error) {
            console.log(error)
        }
    }

    async getProductById(id) {
        try {
            return await productsModel.findById(id)        
        } catch (error) {
            console.log(error)
        }
    }

    async updateProduct(pid, fieldToUpdate) {
        try {
            const filter = { _id: pid };
            return await productsModel.findOneAndUpdate(filter, fieldToUpdate,{new:true});
                        
        } catch (error) {
            console.log("Error: ", error)
        }


    }



    async deleteById(pid) {
        try {
            const filter = {_id: pid};
            const deletedProduct = await productsModel.findOneAndDelete(filter);
            return deletedProduct
        } catch (error) {
            console.log(error)
        }
    }

    async deleteAll(){
        return await productsModel.deleteMany();
        
    }


    //paginate

    async paginateProduct(query,options){
        const products = await productsModel.paginate(query,options);
        return products
    }


    //manejo con el servidor

    async listToShow(id) {
        let products = await this.getProducts();
        if (products.length === 0) {
            return products
        }
        else if (id) {
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



