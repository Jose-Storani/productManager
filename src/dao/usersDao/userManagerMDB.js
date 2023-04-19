import { usersModel } from "../mongoDB/models/users.model.js";
import { hashPassword } from "../../utilities.js";
import { comparePasswords } from "../../utilities.js";

export default class UserManager{
    async createUser(userInfo){
        try {
            const {email,password} = userInfo;
            const existUser = await usersModel.find({email});
            console.log(existUser)
            
            if(existUser.length !==0){
                return null
            }
            else{
                const hashNewPassword = await hashPassword(password);
                const newUser = {
                    ...userInfo,
                    password:hashNewPassword
                }
                return await usersModel.create(newUser);
                
            }
        } catch (error) {
            console.log(error)
        }
    }

    async findUser(email,password){
        try {

            const correctUser = await usersModel.find({email:email}).lean();
            if(email === "adminCoder@coder.com" && password ==="adminCod3r123"){
                const adminUser = {
                    first_name: "AdminCoder",
                    email: email,
                    password: password,
                    rol: "Admin"
                }
                return adminUser
            }
            else{
                if(correctUser.length){
                    const isPassword = await comparePasswords(password,correctUser[0].password);
                    console.log(isPassword)
                    if(isPassword){
                        correctUser[0].rol = "Usuario"
                        return correctUser[0]
                    }
                    else{ 
                        return null
                    }
                    }
                   
                else{
                    return null
                }
            }
            
        } catch (error) {
            console.log(error)
        }
    }
}