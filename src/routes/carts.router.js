import { Router } from "express";
import { sucursalCentro } from "../app.js";
import { carrito } from "../app.js";
const router= Router();



router.get("/",async (req,res) => {   
    res.json(carrito)
})


router.post("/",async (req,res) => {
    res.status(200).json(await sucursalCentro.addToCart());

})

router.put("/",(req,res) => {
    
})

router.delete("/",(req,res) => {
    
})

export default router