import { Router } from "express";
import { userManager } from "../app.js";
import passport from "passport"
const router = Router();

router.get("/",async(req,res)=>{
    try {
        const userStorageData = await userManager.findUser()
    } catch (error) {
        console.log(error)
    }
});

router.get("/registroGithub",passport.authenticate("github",{
    scope:["user:email"]
}))

router.get("/github", passport.authenticate("github"),(req,res)=>{
    //es recomendable que despues del registro por terceros, se redireccione al perfil
    req.session.email = req.user.email
    res.send("registro con github");
});

export default router