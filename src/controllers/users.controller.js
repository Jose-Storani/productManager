import { createNewUser, checkUser } from "../services/users.service.js";

export const createUser = async (req, res) => {
    try {
        const { userInfo } = req.body;
        const response = await createNewUser(userInfo);
        res.json({ mensaje: "Usuario creado", usuario: response });
    } catch (error) {
        console.log(error);
    }
};

export const findUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const response = await checkUser(email, password);
        res.json({ mensaje: response });
    } catch (error) {
        console.log(error);
    }
};
