import { Router } from "express";
import { cartVerification } from "../middlewares/cartVerification.middleware.js";
import { cartById, createCart, getAllCarts, addProducToCart, addArrayToCart, updateByQuery, deleteCById, deleteProductFromCart, deleteAll } from "../controllers/carts.controller.js";


import { stockVerification } from "../middlewares/stockVerification.middleware.js";
import { deleteTicketById, getAllTickets, purchaseGenerator, deleteTickets, getTicketByNumber } from "../controllers/tickets.controller.js";
import { adminValidation } from "../middlewares/userValidation.js";
const router = Router();

//!RUTA: API/CARTS

//*TICKETS RELATED
router.get("/tickets", getAllTickets )
router.post("/ticket-by-number",getTicketByNumber)

router.delete("/:tid/tickets",adminValidation,deleteTicketById)

router.delete("/tickets",adminValidation, deleteTickets)

//CART RELATED
router.get("/", getAllCarts)

router.get("/:cid", cartById)

//generacion de tickets con detalle de compra previa verificación de stock. Producto que no hay stock, queda en el carrito del usuario 
router.post("/:cid/purchase", stockVerification, purchaseGenerator )

router.post("/", cartVerification, createCart)

router.post("/:cid/product/:pid", addProducToCart)

router.put("/:cid", addArrayToCart)

router.put("/:cid/products/:pid", updateByQuery);

router.delete("/",adminValidation, deleteAll)

router.delete("/:cid",adminValidation, deleteCById)

router.delete("/:cid/product/:pid", deleteProductFromCart);



export default router