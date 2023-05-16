import { cartDao } from "../dao/factory.js";

export const getCarts =async () => {
    const carts = await cartDao.getAll();
    return carts
}

export const getCartbyId = async(cId) =>{

    const response = await cartDao.getById(cId);
    if(response){
        const cartFounded = response[0];
        return cartFounded
    }
    return response
}

export const createACart = async () => {
    const newCart = await cartDao.create();
    return newCart
}

export const addToCart = async (cid,pid) => {
    const productAdded = await cartDao.addToCart(cid,pid);
    return productAdded
};

export const updateQuantityByQuery = async(cid,pid,quantity) =>{
    const updatedProduct = await cartDao.updateQuantityByQuery(cid,pid,quantity);
    return updatedProduct
}

export const updateCartProductsByArray = async(cid,productsArray) =>{
    const updatedCart = await cartDao.updateCartProductsByArray(cid,productsArray);
    return updatedCart
};

export const deleteAllCarts = async() =>{
    const deletedCarts = await cartDao.deleteAll();
    return deletedCarts
}

export const deleteCartById = async (cid) =>{
    const cartDeleted = await cartDao.deleteById(cid);
    return cartDeleted
    
}

export const deleteProductCart = async (cid,pid) =>{
    const updatedCart = await cartDao.deleteProductCart(cid,pid);
    return updatedCart;
}