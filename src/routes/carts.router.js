import { Router } from "express";
import { cartVerification } from "../../middlewares/cartVerification.middleware.js";
import { cartById, createCart, getAllCarts, addProducToCart, addArrayToCart, updateByQuery, deleteCById, deleteProductFromCart, deleteAll } from "../controllers/carts.controller.js";
import { createATicket, getTicket } from "../services/ticket.service.js";
import { getCartbyId, updateCartProductsByArray } from "../services/cart.service.js";
import { updateProduct } from "../services/products.service.js";
import { cartDao } from "../dao/factory.js";
const router = Router();

//!RUTA: API/CARTS

//todos los carritos
router.get("/", getAllCarts)

router.get("/tickets", async (req, res) => {
    const tickets = await getTicket();
    res.json({ tickets })
})

//carrito por ID pasado por params

router.get("/:cid", cartById)

router.post("/:cid/purchase", async (req, res, next) => {
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

}, async (req, res) => {
    const { amount, purchaser } = req.body;
    const ticketData = { amount, purchaser };
    const cartPurchaseData = req.newPurchaseCart
    const ticketCreated = await createATicket(ticketData);
    const userPurchase = {
        ticketCreated,
        cartPurchaseData

    }

    res.json({ compraRealizada: userPurchase })
})

router.put("/:cid/test", async (req, res) => {
    const { cid } = req.params
    const response = await cartDao.updateCartProductsByArray(cid)
    res.json({ response })
})

router.post("/", cartVerification, createCart)

router.post("/:cid/product/:pid", addProducToCart)

router.put("/:cid", addArrayToCart)

router.put("/:cid/products/:pid", updateByQuery);

router.delete("/", deleteAll)

router.delete("/:cid", deleteCById)

router.delete("/:cid/product/:pid", deleteProductFromCart);



export default router