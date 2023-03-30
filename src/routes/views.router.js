import { Router } from "express";
import { productManager } from "../app.js";
import { userValidation } from "../../middlewares/userValidation.js";

const router = Router();

router.get("/", async (req,res)=>{  
    console.log(req.session.email)
    res.render("login",{isAuthenticated: req.session.email});   
})

router.get("/realtimeproducts", (req,res)=>{
    res.render("realTimeProducts")

})

router.get("/chat",(req,res)=> {
    res.render("chat",{})
});

router.get("/products",userValidation, async(req,res)=>{
    res.render("products",req.session.userInfo);
})

router.get("/registro",async (req,res)=>{
    res.render("registro")
})

router.get("/registroSuccess",async(req,res)=>{
    res.render("registroSuccess");
});

router.get("/registroFailed", async(req,res)=>{
    res.render("registroFailed");
})

router.get("/loginError", async (req,res)=>{
    res.render("loginError")
});

router.get("/jwtfront",(req,res)=>{
    res.render("jwt")
});

export default router