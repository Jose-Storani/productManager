import { getCartbyId,updateCartProductsByArray } from "../services/cart.service.js";
import { updateProduct } from "../services/products.service.js";

export const stockVerification = async (req, res, next) => {
    const { cid } = req.params
    const purchaserCart = await getCartbyId(cid);
    let newPurchaseCart = [];
    purchaserCart.products.forEach( (product, productIndex) => {
        if (product.productId.stock >= product.quantity) {
            updateProduct(product.productId, { stock: product.productId.stock - product.quantity });
            newPurchaseCart.push(product);
            purchaserCart.products.splice(productIndex, 1);

        }
    })


    const arrayToUpdate = await purchaserCart.products.map((product) => {
        return {
            productId: product.productId,
            quantity: product.quantity
        }
    })

    req.newPurchaseCart = newPurchaseCart;
    await updateCartProductsByArray(cid, arrayToUpdate);
    next();

}