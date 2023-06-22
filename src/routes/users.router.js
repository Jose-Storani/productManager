import { Router } from "express";
import passport from "passport"
import { changeUserRol, deleteAllUsers, deleteInactiveUsers, deleteUser } from "../controllers/users.controller.js";
import { adminValidation } from "../middlewares/userValidation.js";
import { usersDao } from "../dao/factory.js";


const router = Router();


router.get("/registroGithub",passport.authenticate("github",{
    scope:["user:email"]
}))

router.get("/github", passport.authenticate("github"),async(req,res)=>{ 
    req.session.userInfo = req.user
    // if(req.user.password === "1$#522%%"){
		// 	res.redirect("/changePassword");
		// }
    res.redirect("/change-password")
});

// registro con passport
router.post("/registro",
passport.authenticate("registro",{
    failureRedirect: "/registro-failed",
    successRedirect: "/registro-success",    
    passReqToCallBack: true
}));

router.post("/changing-rol",adminValidation, changeUserRol);


router.delete("/",adminValidation,deleteInactiveUsers)
router.delete("/deleteall",adminValidation,deleteAllUsers);



router.delete("/delete-by-id",adminValidation,deleteUser)





export default router