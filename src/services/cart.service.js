import { cartDao } from "../dao/factory.js";

export const getCarts =async () => {
    const carts = await cartDao.getCarts();
    return carts
}

export const getCartbyId = async(cId) =>{
    const cartFounded = await cartDao.getCartbyId(cId);
    return cartFounded
}

export const createACart = async () => {
    const newCart = await cartDao.createACart();
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
    const deletedCarts = await cartDao.deleteAllCarts();
    return deletedCarts
}

export const deleteCartById = async (cid) =>{
    const cartDeleted = await cartDao.deleteCartById(cid);
    return cartDeleted
    
}

export const deleteProductCart = async (cid,pid) =>{
    const updatedCart = await cartDao.deleteProductCart(cid,pid);
    return updatedCart;
}