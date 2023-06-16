import { Router } from "express";
import { adminValidation, userValidation } from "../middlewares/userValidation.js";
import { changeUserRol, getAllUsersRol, profileRender } from "../controllers/users.controller.js";



const router = Router();

router.get("/", (req,res)=>{  
	
	res.render("login",{isAuthenticated: req.session.userInfo?.email});  
})

router.get("/changeRol", adminValidation, getAllUsersRol )

router.get("/realtimeproducts",adminValidation, (req,res)=>{
    res.render("realTimeProducts",{adminData:true})

})

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

router.get("/purchaseSuccessful", userValidation, (req,res)=>{
	res.render("purchaseSuccessful",{data:req.session.userInfo.purchaseData.ticketCreated})
})

router.get("changePassword", (req,res)=>{
	res.render("changePassword")
})

export default router
