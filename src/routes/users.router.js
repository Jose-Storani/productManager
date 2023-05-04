import { Router } from "express";
import passport from "passport"
import { findUser } from "../controllers/users.controller.js";
import { createNewUser } from "../services/users.service.js";

const router = Router();

router.get("/",findUser)

router.get("/registroGithub",passport.authenticate("github",{
    scope:["user:email"]
}))

router.get("/github", passport.authenticate("github"),async(req,res)=>{
    console.log({server:req.user})  
    req.session.userInfo = req.user
    
    res.redirect("/products")
});

//registro con passport
// router.post("/registro",
// passport.authenticate("registro",{
//     failureRedirect: "/registroFailed",
//     successRedirect: "/registroSuccess",    
//     passReqToCallBack: true
// }));

router.post("/registro", async(req,res)=>{
    try {
        const newUser = await createNewUser(req.body)
        res.send(newUser)
    } catch (error) {
        console.log("este fue el error", error)
    }
})


export default router