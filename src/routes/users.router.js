import { Router } from "express";
import { userManager } from "../app.js";
const router = Router();

router.get("/",async(req,res)=>{
    try {
        const userStorageData = await userManager.findUser()
    } catch (error) {
        console.log(error)
    }
});

export default router