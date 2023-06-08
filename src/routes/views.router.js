import { Router } from "express";
import { adminValidation, userValidation } from "../middlewares/userValidation.js";
import { profileRender } from "../controllers/users.controller.js";


const router = Router();

router.get("/", async (req,res)=>{  
    res.render("login",{isAuthenticated: req.session.userInfo?.email});   
})

router.get("/realtimeproducts", (req,res)=>{
    res.render("realTimeProducts")

})



router.get("/chat",(req,res)=> {
    res.render("chat",{})
});

router.get("/products",userValidation,profileRender )

router.get("/registro",(req,res)=>{
    res.render("registro")
})

router.get("/registroSuccess",(req,res)=>{
    res.render("registroSuccess");
});

router.get("/registroFailed", (req,res)=>{
    res.render("registroFailed");
})

router.get("/loginError", (req,res)=>{
    res.render("loginError")
});

router.get("/jwtfront",(req,res)=>{
    res.render("jwt")
});

router.get("/purchaseSuccessful",(req,res)=>{
	res.render("purchaseSuccessful",{data:req.session.userInfo.purchaseData.ticketCreated})
})

export default router
