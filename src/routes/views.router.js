import { Router } from "express";
import { productManager } from "../app.js";

const router = Router();

router.get("/", async (req,res)=>{  
    const productos = await productManager.getProducts();
    res.render("home",{productos})
   
   
})

router.get("/realtimeproducts", (req,res)=>{
    res.render("realTimeProducts")

})

router.get("/chat",(req,res)=> {
    res.render("chat",{})
})



export default router