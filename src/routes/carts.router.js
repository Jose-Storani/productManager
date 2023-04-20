import { Router } from "express";
import { cartVerification } from "../../middlewares/cartVerification.middleware.js";
import { cartById, createCart, getAllCarts,addProducToCart,addArrayToCart,updateByQuery,deleteCById,deleteProductFromCart, deleteAll } from "../controllers/carts.controller.js";
const router = Router();

//!RUTA: API/CARTS

//todos los carritos
router.get("/",getAllCarts)

//carrito por ID pasado por params

router.get("/:cid", cartById)

router.post("/",createCart)

router.post("/:cid/product/:pid", addProducToCart)

router.put("/:cid",addArrayToCart)

router.put("/:cid/products/:pid", updateByQuery);

router.delete("/", deleteAll)

router.delete("/:cid", deleteCById)

router.delete("/:cid/product/:pid", deleteProductFromCart);



export default router