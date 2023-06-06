import { transporter } from "../mensajeria/nodemailer.js";
import { client } from "../mensajeria/twilio.js";
import config from "../config.js";

export const mailController = async (req, res, next) => {
  try {
    await transporter.sendMail({
      from: "Jose Storani",
      //se le puede pasar un array de mails para enviar el mismo mail a varias personas, tipo difusión.
      to: "jdstorani91@gmail.com",
      subject: "Probando",
      text: "Probando",
      //para archivos adjuntos uso attachments
      // attachments:[{
      //     path: __dirname + "/APRENDA_A_MEDITAR.pdf"
      // }]
    });
    res.send("Email sent");
  } catch (error) {
    next(error);
  }
};

export const twilioController = async (req, res, next) => {
  try {
    //creacion de mensajes con twilio
    await client.messages.create({
      body: "Probando Twilio",
      from: config.twilioPhoneNumber,
      to: "+543413762695",
    });

    res.send("Probando Twilio");
  } catch (error) {
    next(error);
  }
};
