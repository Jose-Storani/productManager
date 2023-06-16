
import { cartDao,usersDao } from "../dao/factory.js";

export async function cartVerification(req, res, next) {
   const { email } = req.session.userInfo;
   if (!req.session.userInfo.hasOwnProperty("associatedCart")) {
      const cartCreated = await cartDao.create();
      const user = await usersDao.updateUserCartID(email, cartCreated.id);
      req.session.userInfo = user;
   }
   next();
}
