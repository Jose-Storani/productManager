import { Router } from "express";
import { userValidation } from "../../middlewares/userValidation.js";

const router = Router();

router.get("/", async (req,res)=>{  
    res.render("login",{isAuthenticated: req.session.email});   
})

router.get("/realtimeproducts", (req,res)=>{
    res.render("realTimeProducts")

})

router.get("/chat",(req,res)=> {
    res.render("chat",{})
});

router.get("/products",userValidation, async(req,res)=>{
    if(req.session.userInfo.rol == "Admin"){
        res.render("products",{userData:req.session.userInfo,partialData:{rol:req.session.userInfo.rol}});
    }
    else{
        res.render("products",{userData:req.session.userInfo});
    }
    
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
