import { Router } from "express";
import { sucursalCentro } from "../app.js";
import { carritos } from "../app.js";
const router= Router();


//todos los carritos
router.get("/",async (req,res) => {   
    res.json(carritos)
})

//carrito por ID pasado por params

router.get("/:cId", async ( req, res) => {
    const {cId} = req.params
    let cart = carritos.find(element => element.id === parseInt(cId));
    if(!cart){
        res.status(400).send("Carrito no encontrado");
    }
    else{
        res.json(cart)
    }
})

router.post("/",async (req,res) => {
    res.status(200).json(await sucursalCentro.addToCart());

})



router.put("/",(req,res) => {
    
})

router.delete("/",(req,res) => {
    
})

export default router