
import { updateOne } from "../services/users.service.js";
import { createACart } from "../services/cart.service.js";

export async function cartVerification(req,res,next){
    const {email} = req.session.userInfo;
 if(!req.session.userInfo.hasOwnProperty("associatedCart")){
   const cartCreated = await createACart();
    const user = await updateOne(email,cartCreated.id);
    req.session.userInfo = user
   
 }   
    next()
}