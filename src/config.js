import dotenv from "dotenv";

dotenv.config();

export default {
    port: process.env.PORT,
    persistencia: process.env.PERSISTENCIA,
    mongoURI: process.env.MONGOURL,
    mongoSessionUrl: process.env.MONGOSESSIONURL,
    gmailUser:process.env.GMAIL_USER,
    gmailPassword: process.env.GMAIL_PASSWORD,
    twilioPhoneNumber:process.env.TWILIO_PHONENUMBER,
    twilioSid: process.env.TWILIO_SID,
    twilioAuthToken:process.env.TWILIO_AUTH_TOKEN
}

