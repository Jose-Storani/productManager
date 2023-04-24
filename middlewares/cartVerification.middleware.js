import { cartDao } from "../src/dao/factory.js";
import { usersModel } from "../src/dao/mongoDB/models/users.model.js";


export async function cartVerification(req,res,next){
    const {email} = req.session.userInfo;
    req.session.userInfo.dataNueva = "Soy nuevo look at me"
 if(!req.session.userInfo.hasOwnProperty("associatedCart")){
    const cartCreated = await cartDao.createACart();
    console.log(cartCreated._id)
    const user = await usersModel.findOneAndUpdate({email},{associatedCart: cartCreated.id},{new:true});
   
 }   
    next()
}