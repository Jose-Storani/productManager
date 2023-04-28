import { Router } from "express";
import { adminValidation, userValidation } from "../middlewares/userValidation.js";
import { profileRender } from "../controllers/users.controller.js";

const router = Router();

router.get("/", async (req,res)=>{  
    res.render("login",{isAuthenticated: req.session.userInfo?.email});   
})

router.get("/realtimeproducts",adminValidation, (req,res)=>{
    res.render("realTimeProducts")

})

router.get("/chat",(req,res)=> {
    res.render("chat",{})
});

router.get("/products",userValidation,profileRender )

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
