import { Router } from "express";
import { userManager } from "../app.js";

const router = Router();

router.post("/login",async (req,res) =>{
    const {email,password} = req.body;
    
    const correctUser = await userManager.findUser(email,password);
    if(correctUser !== null){
        req.session.userInfo = correctUser;
        req.session.email = email;
        res.redirect("/perfil");
    }
    


}
)

router.post("/registro",async(req,res)=>{

    try {
        const newUserInfo = req.body;
        const newUser = await userManager.createUser(newUserInfo);
        
        if(!newUser){
            res.send("error Login")
        }
        else{

            res.render("registroSuccess")
        }
    } catch (error) {
        console.log(error)
    }
    

})

export default router