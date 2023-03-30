import { Router } from "express";
import passport from "passport"
const router = Router();



router.get("/registroGithub",passport.authenticate("github",{
    scope:["user:email"]
}))

router.get("/github", passport.authenticate("github"),(req,res)=>{
    //es recomendable que despues del registro por terceros, se redireccione al perfil
    // console.log({server:req.user})
    req.session.email = req.user.email
    res.redirect("/products")
});

export default router