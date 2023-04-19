import { productsDao } from "../dao/factory.js";

export const getProducts =async ()=>{
    const products = await productsDao.getProducts();
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
    const product = await productsDao.getProductById(id)
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