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

router.get("/github", passport.authenticate("github"));

export default router