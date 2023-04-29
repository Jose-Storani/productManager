import { usersModel } from "../mongoDB/models/users.model.js";
import { hashPassword, comparePasswords } from "../../utilities.js";
import config from "../../config.js";


export default class UserManager {
    async createUser(userInfo) {
        try {
            const { email, password } = userInfo;
            const existUser = await usersModel.find({ email });
            if (existUser.length && password !== " ") {
                return null;
            } else {
                //si se registra con GH, asigno password un string vacío.
                if (existUser.length && userInfo.password === " ") {
                    return existUser[0]
                } else {
                    const hashNewPassword = password !==" " ?await hashPassword(password): password

                    const newUser =
                        email === config.admins.coder || email === config.admins.creator || email ===config.admins.other
                            ? {
                                ...userInfo,
                                password: hashNewPassword,
                                rol: "Administrador",
                            }
                            : {
                                ...userInfo,
                                password: hashNewPassword,
                            };


                    console.log(newUser)
                    return await usersModel.create(newUser);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    async findUser(email, password) {
        try {
            const correctUser = await usersModel.find({ email }).lean();
            if (correctUser.length) {
                const isPassword = await comparePasswords(
                    password,
                    correctUser[0].password
                );
                if (isPassword) {
                    return correctUser[0];
                } else {
                    return null;
                }
            } else {
                return null;
            }
        } catch (error) {
            console.log(error);
        }
    }

    async updateUser(email, updateId) {
        try {
            const response = await usersModel.findOneAndUpdate({ email }, { associatedCart: updateId }, { new: true });
            return response;
        } catch (error) {
            console.log(error);
        }
    }
}
