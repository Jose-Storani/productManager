import dotenv from "dotenv";

dotenv.config();

export default {
    port: process.env.PORT,
    persistencia: process.env.PERSISTENCIA,
    mongoURI: process.env.MONGO_URL,
    mongoSessionUrl: process.env.MONGO_SESSION_URL,
    gmailUser:process.env.GMAIL_USER,
    gmailPassword: process.env.GMAIL_PASSWORD,
    admins: {coder: process.env.CODER_ADMIN,
        creator:process.env.CREATOR_ADMIN,
        other: process.env.OTHER_ADMIN
    },
		adminAccount: {
			adminUser : process.env.ADMIN,
			adminPass : process.env.ADMIN_PASS
		},
    environment : process.env.ENVIRONMENT
}

