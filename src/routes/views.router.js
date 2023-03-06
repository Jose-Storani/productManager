import { Router } from "express";
import { productManager } from "../app.js";

const router = Router();

router.get("/", async (req,res)=>{  
    const productos = await productManager.getProducts();
    console.log(productos)
    res.render("home",{productos})
   
   
})

router.get("/realtimeproducts", (req,res)=>{
    res.render("realTimeProducts")

})

router.get("/chat",(req,res)=> {
    res.render("chat",{})
});

router.get("/products", async(req,res)=>{
    res.render("products")
})




export default router