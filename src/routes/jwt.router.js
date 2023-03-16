import { Router } from "express";
import { generateToken } from "../utilities.js";
import { usersModel } from "../dao/models/users.model.js";
import { userManager } from "../app.js";
const router = Router();


router.post("/login",async(req,res)=>{
    const {email,password} = req.body;  
    const user = await userManager.findUser(email,password);
    if(user){
        const token = generateToken(user);
        res.json({token})
    }
    else{
        res.json({mensaje:"error logeo"});
    }
    
})


export default router;