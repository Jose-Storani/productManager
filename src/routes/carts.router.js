import { Router } from "express";

const router= Router();

router.get("/", (req,res) => {   
    res.send("todo ok")
})


router.post("/",(req,res) => {

})

router.put("/",(req,res) => {
    
})

router.delete("/",(req,res) => {
    
})

export default router