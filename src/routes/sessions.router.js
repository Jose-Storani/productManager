import { Router } from "express";
import passport from "passport"

const router = Router();

router.get("/", async (req,res)=>{
    res.json(req.session)
})

router.get("/logout",async (req,res)=>{
    try {
        req.session.destroy((err) => {
            if(err){
                res.send("LogOut Error");
            }
            else{
                res.status(400).json({status:true})
            }            
        })
        
    } catch (error) {
        console.log(error)
    }    
})



//login con passport

router.post("/login",
passport.authenticate("login",{
    failureRedirect:"/loginError",
    passReqToCallBack:true
}), async (req,res)=>{
    req.session.userInfo = req.user;
    req.session.email = req.body.email;
    // res.json({data: req.session.userInfo})
    res.redirect("/products")
    
})



export default router