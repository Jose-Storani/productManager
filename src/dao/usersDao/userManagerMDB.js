import { usersModel } from "../mongoDB/models/users.model.js";
import { hashPassword } from "../../utilities.js";
import { comparePasswords } from "../../utilities.js";

export default class UserManager{
    async createUser(userInfo){
        try {
            const {email,password} = userInfo;
            const existUser = await usersModel.find({email});
            if(existUser.length){
                return null
            }
            else{
                if(userInfo.password === " "){
                    return await usersModel.create(userInfo);
                }
                else{
                    const hashNewPassword = await hashPassword(password);
                    const newUser = {
                        ...userInfo,
                        password:hashNewPassword
                    }
                    return await usersModel.create(newUser);
                }
                
                
            }
        } catch (error) {
            console.log(error)
        }
    }

    async findUser(email,password){
        try {

            const correctUser = await usersModel.find({email}).lean();
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

    async findOneUser(email){
        try {
            const response = await usersModel.findOne({email});
            return response
        } catch (error) {
            console.log(error)
        }

    }
}