import {dirname} from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const __dirname = dirname(fileURLToPath(import.meta.url));





export const hashPassword = async (password) =>{
    return bcrypt.hash(password,10)
}

//sirve para comparar la contraseña ingresada con la hasheada en la base de datos
export const comparePasswords = async(password,passwordBD) =>{
    return bcrypt.compare(password,passwordBD)
}



//funcion generadora de token(ya no creamos session en coleccion)
export const generateToken = (user) =>{
    const token = jwt.sign({user},"secretJWT",{expiresIn:"1h"});
    return token
};

