import { Router } from "express";
import { adminValidation, userValidation } from "../middlewares/userValidation.js";
import { cartVerification } from "../middlewares/cartVerification.middleware.js";
import { changeUserRol, getAllUsersRol, profileRender } from "../controllers/users.controller.js";



const router = Router();

router.get("/", (req,res)=>{  
	
	res.render("login",{isAuthenticated: req.session.userInfo?.email});  
})

router.get("/change-rol", adminValidation, getAllUsersRol )

router.get("/products-registration",adminValidation, (req,res)=>{
    res.render("products-registration",{adminData:true})

})

router.get("/products",userValidation,cartVerification,profileRender)

router.get("/registro",(req,res)=>{
	req.session.destroy();
	res.clearCookie("sessionID");
	res.render("registro")
})


router.get("/registro-failed", (req,res)=>{
	req.session.destroy();
    res.render("registro-failed");
})

router.get("/purchase-successful", userValidation, (req,res)=>{
	res.render("purchase-successful",{data:req.session.userInfo.purchaseData})
})



export default router
