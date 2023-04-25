import { Router } from "express";
import { cartVerification } from "../../middlewares/cartVerification.middleware.js";
import { cartById, createCart, getAllCarts,addProducToCart,addArrayToCart,updateByQuery,deleteCById,deleteProductFromCart, deleteAll } from "../controllers/carts.controller.js";
import { ticketModel } from "../dao/mongoDB/models/ticket.model.js";
const router = Router();

//!RUTA: API/CARTS

//todos los carritos
router.get("/",getAllCarts)

//carrito por ID pasado por params

router.get("/:cid", cartById)

router.post("/purchase",async(req,res)=>{
    const ticketData = req.body;
    console.log(ticketData)
    const ticketCreated = await ticketModel.create(ticketData);
    res.json({ticketCreado:ticketCreated})
})

router.post("/",cartVerification,createCart)

router.post("/:cid/product/:pid", addProducToCart)

router.put("/:cid",addArrayToCart)

router.put("/:cid/products/:pid", updateByQuery);

router.delete("/", deleteAll)

router.delete("/:cid", deleteCById)

router.delete("/:cid/product/:pid", deleteProductFromCart);



export default router