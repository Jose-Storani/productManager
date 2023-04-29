import { Router } from "express";
import { userGenerator, productGenerator } from "../mocks/mocksGenerator.js";
import passport from "passport"
import { addOneProduct } from "../controllers/products.controller.js";
const router = Router();

router.post("/usersTest", async (req, res,next) => {
    const user = userGenerator();
    req.body = user
    next()

},passport.authenticate("registro",{
    failureRedirect: "/registroFailed",   
    passReqToCallBack: true
}), async(req,res)=>{
    res.json(req.user)
} )


router.post("/productsTest",(req,res,next)=>{
    const product = productGenerator();
    req.body = product
    next()
}, addOneProduct)

export default router