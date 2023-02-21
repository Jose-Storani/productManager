import { Router } from "express";
import { productos } from "../app.js";
const router = Router();

router.get("/", (req,res)=>{  
    res.render("home",{productos})
   
})

router.get("/realtimeproducts", (req,res)=>{
    res.render("realTimeProducts",{productos})

})

export default router