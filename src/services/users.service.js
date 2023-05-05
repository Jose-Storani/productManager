import { usersDao } from "../dao/factory.js";

export const createNewUser = async (userInfo) =>{
        const response = await usersDao.createUser(userInfo);
        return response
}

export const checkUser = async (email,password) =>{   
        const userFound = await usersDao.findUser(email,password);
        return userFound
}

export const updateOne = async (email,updateId) =>{
        const response = await usersDao.updateUser(email,updateId);
        return response
}

