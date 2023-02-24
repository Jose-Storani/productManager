import { Router } from "express";
import { cartManager } from "../app.js";
import { carts } from "../app.js";
const router= Router();


//todos los carritos
router.get("/",async (req,res) => {   
    res.json(carts)
})

//carrito por ID pasado por params

router.get("/:cId", async ( req, res) => {
    const carts = await cartManager.getCarts()
    const { cId } = req.params;
    //si uso fileSystem, tengo que hacer parseInt al id, con MONGO, el id es un string
    const cart = carts.find(p => p.id === cId);
    if (cart) {
        res.json(cart)
    }
    else {
        res.json({ mensage: "Carrito no encontrado" })
    }
})

router.post("/",async (req,res) => {
    res.status(200).json(await cartManager.createACart());
    
})

router.post("/:cid/product/:pid", async (req,res) => {
    const {cid,pid} = req.params;
   const respuesta =  await cartManager.addToCart(parseInt(cid),parseInt(pid));
   if(respuesta === 400){
    res.status(400).send("ID de carrito no encontrado");
   }
   else{
    res.status(200).json({message: "Producto agregado con exito", respuesta})
   }
   

    
    


})



router.put("/",(req,res) => {
    
})

router.delete("/", async(req,res) => {
    try {
        const response = await cartManager.deleteAllCarts();
        res.json({mensaje: "Carritos eliminados con exito", cantidad: response})
    } catch (error) {
        console.log(error)
    }
})

export default router