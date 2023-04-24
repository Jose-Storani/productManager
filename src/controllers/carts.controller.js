import { getCarts,getCartbyId,createACart,addToCart,updateCartProductsByArray,updateQuantityByQuery,deleteAllCarts,deleteCartById,deleteProductCart } from "../services/cart.service.js";

export const getAllCarts = async(req,res)=>{
    const carts = await getCarts();
    res.json(carts)
}

export const cartById = async(req,res) =>{
    try {
        const {cid} = req.params;
        const cart = await getCartbyId(cid);
        if(cart){
            
            const cartProducts = cart.products;
            res.json({respuesta:cartProducts})
            
            // res.render("cart",{cartProducts})
        }
        else{
            res.json({mensaje: "Carrito no encontrado"});
        }
    } catch (error) {
        console.log(error)
    }
}

export const createCart = async (req,res) =>{
    const cart = await createACart();
    res.json({carritoCreado : cart});
    // const cartId = req.session.userInfo.associatedCart._id
    // res.status(200).json({cartId
    // })
}

export const addProducToCart = async(req,res) => {
    try {
        
        const { cid, pid } = req.params;
        const respuesta = await addToCart(cid, pid);
        if (!respuesta) {
            res.json({ mensage: "Carrito no encontrado" })
        }
        else {
            res.json(respuesta)
        }
    } catch (error) {
        console.log(error)
    }
}


export const addArrayToCart = async (req,res) => {
    try {
        const { cid } = req.params;
        const { products } = req.body;
        const productsUpdated = await updateCartProductsByArray(cid, products);
        if (productsUpdated) {
            res.json(productsUpdated)
        }
        else {
            res.json({ mensaje: "carrito no encontrado para actualizar" })
        }

    } catch (error) {
        console.log(error)
    }
}

export const updateByQuery = async (req,res) => {
    const { quantity } = req.body;
    const { cid, pid } = req.params;
    const updatedProduct = await updateQuantityByQuery(cid, pid, quantity);
    res.json(updatedProduct)
}



export const deleteAll = async(req,res) =>{
    try{
        const response = await deleteAllCarts();
        res.json({ mensaje: "Carritos eliminados con exito", cantidad: response })
    }
     catch (error) {
    console.log(error)
}
}

export const deleteCById = async (req,res) => {
    try {
        const { cid } = req.params;

        const deletedCart = await deleteCartById(cid);
        res.status(200).json({ "carrito eliminado con exito: ": deletedCart })

    } catch (error) {
        console.log(error)
    }
}

export const deleteProductFromCart = async (req,res) =>{
    const { cid, pid } = req.params

    const productDeletedFromCart = await deleteProductCart(cid, pid);
    if (productDeletedFromCart) {
        res.json({ "producto eliminado con exito": productDeletedFromCart })
    }
    else {
        res.json({ "error": "producto no encontrado" })
    }
}