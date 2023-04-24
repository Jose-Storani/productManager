import { usersDao } from "../dao/factory.js";

export const createNewUser = async (userInfo) =>{
    try {
        const response = await usersDao.createUser(userInfo);
        return response
    } catch (error) {
        console.log(error)
    }
    
}

export const checkUser = async (email,password) =>{
    try {
        const userFound = await usersDao.findUser(email,password);
        return userFound
    }
     catch (error) {
        console.log(error)
    }
}

export const findOne = async (email) =>{
    try {
        const response = await usersDao.findOneUser(email);
        return response
    } catch (error) {
        console.log(error)
    }
}

