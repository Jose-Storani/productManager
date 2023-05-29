import { productsDao } from "../dao/factory.js";

class ProductsService{
    constructor(productsDao){
        this.productsDao = productsDao
    }

   getAllProducts(){
        return this.productsDao.getAll();
    }
}

export const productService = new ProductsService(productsDao)

export const getProducts =async ()=>{
    const products = await productsDao.getAll();
    return products
}

export const addProduct = async (obj) =>{   
        const response = await productsDao.addProduct(obj);
        return response;

}

export const aggregation =async (categ,sort) => {
    const response = await productsDao.aggregationFunc(categ,sort);
    return response
}

export const getProductById = async(id) =>{
    const product = await productsDao.getById(id);
    return product
};

export const updateProduct = async (pid,fieldToUpdate) =>{
    const updatedProduct = await productsDao.updateProduct(pid,fieldToUpdate);
    return updatedProduct;
}

export const deleteById = async(pid) => {
    const deletedProduct = await productsDao.deleteById(pid);
    return deletedProduct;
}

export const deleteAll = async() => {
    const deleted = await productsDao.deleteAll();
    return deleted
}

export const paginateProduct = async(query,options) =>{
    const products = await productsDao.paginateProduct(query,options)
    return products
}