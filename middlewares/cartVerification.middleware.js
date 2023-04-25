
import { updateOne } from "../src/services/users.service.js";
import { createACart } from "../src/services/cart.service.js";

export async function cartVerification(req,res,next){
    const {email} = req.session.userInfo;
 if(!req.session.userInfo.hasOwnProperty("associatedCart")){
   const cartCreated = await createACart();
    const user = await updateOne(email,cartCreated.id);
    req.session.userInfo = user
   
 }   
    next()
}