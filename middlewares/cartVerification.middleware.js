import { cartManager } from "../src/app.js";
import { usersModel } from "../src/dao/models/users.model.js";


export async function cartVerification(req,res,next){
    const {email} = req.session.userInfo;
 if(!req.session.userInfo.hasOwnProperty("associatedCart")){
    const cartCreated = await cartManager.createACart();
    const user = await usersModel.findOneAndUpdate({email},{associatedCart: cartCreated.id},{new:true});
 }   
    next()
}