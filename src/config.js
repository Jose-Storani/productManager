import dotenv from "dotenv";

dotenv.config();

export default {
    port: process.env.PORT,
    persistencia: process.env.PERSISTENCIA,
    mongoURI: process.env.MONGO_URL,
    mongoSessionUrl: process.env.MONGO_SESSION_URL,
    gmailUser:process.env.GMAIL_USER,
    gmailPassword: process.env.GMAIL_PASSWORD,
    twilioPhoneNumber:process.env.TWILIO_PHONENUMBER,
    twilioSid: process.env.TWILIO_SID,
    twilioAuthToken:process.env.TWILIO_AUTH_TOKEN,
    admins: {coder: process.env.CODER_ADMIN,
        creator:process.env.CREATOR_ADMIN
    }
}

