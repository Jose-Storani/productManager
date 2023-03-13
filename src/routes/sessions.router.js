import { Router } from "express";
import { userManager } from "../app.js";

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

router.post("/login",async (req,res) =>{
    const {email,password} = req.body;
    const correctUser = await userManager.findUser(email,password);
    if(correctUser !== null){
        req.session.userInfo = correctUser;
        req.session.email = email;
        res.redirect("/products");
    }
    else{
        res.render("loginError")
    }
    


}
)

router.post("/registro",async(req,res)=>{

    try {
        const newUserInfo = req.body;
        const newUser = await userManager.createUser(newUserInfo);
        
        if(!newUser){
            res.render("registroFailed")
        }
        else{

            res.render("registroSuccess")
        }
    } catch (error) {
        console.log(error)
    }
    

})

export default router