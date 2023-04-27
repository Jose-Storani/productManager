import { Router } from "express";
import { cartVerification } from "../../middlewares/cartVerification.middleware.js";
import { cartById, createCart, getAllCarts, addProducToCart, addArrayToCart, updateByQuery, deleteCById, deleteProductFromCart, deleteAll } from "../controllers/carts.controller.js";
import { createATicket, getTicket } from "../services/ticket.service.js";
import { cartDao } from "../dao/factory.js";
import { stockVerification } from "../../middlewares/stockVerification.middleware.js";
import { purchaseGenerator } from "../controllers/tickets.controller.js";
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

//generacion de tickets con detalle de compra previa verificación de stock. Producto que no hay stock, queda en el carrito del usuario 
router.post("/:cid/purchase", stockVerification, purchaseGenerator)

router.post("/", cartVerification, createCart)

router.post("/:cid/product/:pid", addProducToCart)

router.put("/:cid", addArrayToCart)

router.put("/:cid/products/:pid", updateByQuery);

router.delete("/", deleteAll)

router.delete("/:cid", deleteCById)

router.delete("/:cid/product/:pid", deleteProductFromCart);



export default router