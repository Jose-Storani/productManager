import dotenv from "dotenv";

dotenv.config();

export default {
    port: process.env.PORT,
    persistencia: process.env.PERSISTENCIA,
    mongoURI: process.env.MONGO_URL,
    mongoSessionUrl: process.env.MONGO_SESSION_URL,
    gmailUser:process.env.GMAIL_USER,
    gmailPassword: process.env.GMAIL_PASSWORD,
		adminAccount: {
			adminUser : process.env.ADMIN,
			adminPass : process.env.ADMIN_PASS
		},
    environment : process.env.ENVIRONMENT,
		maxAttempsValue : process.env.MAX_ATTEMPS_VALUE
}

