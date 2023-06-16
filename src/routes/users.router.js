import { Router } from "express";
import passport from "passport"
import { deleteAllUsers } from "../controllers/users.controller.js";
import { adminValidation } from "../middlewares/userValidation.js";


const router = Router();


router.get("/registroGithub",passport.authenticate("github",{
    scope:["user:email"]
}))

router.get("/github", passport.authenticate("github"),async(req,res)=>{ 
    req.session.userInfo = req.user
    // if(req.user.password === "1$#522%%"){
		// 	res.redirect("/changePassword");
		// }
    res.redirect("/changePassword")
});

// registro con passport
router.post("/registro",
passport.authenticate("registro",{
    failureRedirect: "/registroFailed",
    successRedirect: "/registroSuccess",    
    passReqToCallBack: true
}));

router.get("/deleteall",adminValidation,deleteAllUsers)




export default router