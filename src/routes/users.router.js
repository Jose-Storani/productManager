import { Router } from "express";
import passport from "passport"
import { findUser } from "../controllers/users.controller.js";

const router = Router();

router.get("/",findUser)

router.get("/registroGithub",passport.authenticate("github",{
    scope:["user:email"]
}))

router.get("/github", passport.authenticate("github"),(req,res)=>{
    //es recomendable que despues del registro por terceros, se redireccione al perfil
    // console.log({server:req.user})   
    req.session.email = req.user.email
    
    // res.redirect("/products")
});

//registro con passport
router.post("/registro",
passport.authenticate("registro",{
    failureRedirect: "/registroFailed",
    successRedirect: "/registroSuccess",    
    passReqToCallBack: true
}));


export default router