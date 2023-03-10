import { Router } from "express";
import { productManager } from "../app.js";
import { userValidation } from "../../middlewares/userValidation.js";

const router = Router();

router.get("/", async (req,res)=>{  
    // const productos = await productManager.getProducts();
    // console.log(productos)
    // res.render("home",{productos})
    res.render("login")
   
   
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

router.get("/registro",async (req,res)=>{
    res.render("registro")
})

router.get("/perfil",userValidation,async(req,res)=>{
    const userInfo = req.session.userInfo[0];
    console.log(userInfo)
    res.render("perfil",userInfo);

    
})


export default router