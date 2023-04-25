import { usersModel } from "../mongoDB/models/users.model.js";
import { hashPassword } from "../../utilities.js";
import { comparePasswords } from "../../utilities.js";

export default class UserManager {
    async createUser(userInfo) {
        try {
            const { email, password } = userInfo;
            const existUser = await usersModel.find({ email });
            if (existUser.length) {
                return null;
            } else {
                //si se registra con GH, asigno password un string vacío.
                if (userInfo.password === " ") {
                    return await usersModel.create(userInfo);
                } else {
                    const hashNewPassword = await hashPassword(password);

                    const newUser =
                        email === "coderAdmin@gmail.com"
                            ? {
                                ...userInfo,
                                password: hashNewPassword,
                                rol: "Administrador",
                            }
                            : {
                                ...userInfo,
                                password: hashNewPassword,
                            };
                    return await usersModel.create(newUser);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    async findUser(email, password) {
        try {
            const correctUser = await usersModel.find({email}).lean();
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

    async updateUser(email,updateId) {
        try {
            const response = await usersModel.findOneAndUpdate({ email},{associatedCart: updateId},{new:true});
            return response;
        } catch (error) {
            console.log(error);
        }
    }
}
