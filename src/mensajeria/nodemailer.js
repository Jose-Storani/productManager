import nodemailer from "nodemailer";
import config from "../config.js";

export const transporter = nodemailer.createTransport({
    //uso service y le paso el servicio correspondiente(se puede usar host también)
    service:"gmail",
    auth:{
        user: config.gmailUser,
        pass:config.gmailPassword,
    }
})