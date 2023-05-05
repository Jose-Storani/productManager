import { Router } from "express";
import passport from "passport"
import {userLogin,userLogOut} from "../controllers/users.controller.js";

const router = Router();

router.get("/", async (req,res)=>{
    res.json(req.session)
})


router.get("/logout",userLogOut)


//login con passport

router.post("/login",
passport.authenticate("login",{
    failureRedirect:"/loginError",
    passReqToCallBack:true
}), userLogin)



export default router