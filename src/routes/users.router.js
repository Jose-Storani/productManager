import { Router } from "express";
import passport from "passport"
import { deleteAllUsers } from "../controllers/users.controller.js";


const router = Router();


router.get("/registroGithub",passport.authenticate("github",{
    scope:["user:email"]
}))

router.get("/github", passport.authenticate("github"),async(req,res)=>{ 
    req.session.userInfo = req.user
    // if(req.user.password === "1$#522%%"){
		// 	res.redirect("/changePassword");
		// }
    res.redirect("/products")
});

// registro con passport
router.post("/registro",
passport.authenticate("registro",{
    failureRedirect: "/registroFailed",
    successRedirect: "/registroSuccess",    
    passReqToCallBack: true
}));

router.get("/deleteall",deleteAllUsers)




export default router