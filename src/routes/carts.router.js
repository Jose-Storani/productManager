import { Router } from "express";
import { cartVerification } from "../middlewares/cartVerification.middleware.js";
import { cartById, createCart, getAllCarts, addProducToCart, addArrayToCart, updateByQuery, deleteCById, deleteProductFromCart, deleteAll } from "../controllers/carts.controller.js";


import { stockVerification } from "../middlewares/stockVerification.middleware.js";
import { deleteTicketById, getAllTickets, purchaseGenerator, deleteTickets } from "../controllers/tickets.controller.js";
const router = Router();

//!RUTA: API/CARTS

//*TICKETS RELATED
router.get("/tickets", getAllTickets )

router.delete("/:tid/tickets",deleteTicketById)

router.delete("/tickets", deleteTickets)

//todos los carritos
router.get("/", getAllCarts)



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