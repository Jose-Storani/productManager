import { usersModel } from "../models/users.model.js";

export class UserManager{
    async createUser(userInfo){
        try {
            const {email} = userInfo;
            const existUser = await usersModel.find({email});
            
            if(existUser.length !==0){
                return null
            }
            else{
                const newUser = await usersModel.create(userInfo);
                return newUser;
            }
        } catch (error) {
            console.log(error)
        }
    }

    async findUser(email,password){
        try {
            const correctUser = await usersModel.find({email:email,password:password}).lean();
            
            if(correctUser.length !==0){
                return correctUser
            }
            else{
                return null
            }
        } catch (error) {
            console.log(error)
        }
    }
}