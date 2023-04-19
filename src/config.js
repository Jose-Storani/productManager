import dotenv from "dotenv";

dotenv.config();

export default {
    port: process.env.PORT,
    persistencia: process.env.PERSISTENCIA,
    mongoURI: process.env.MONGOURL,
    mongoSessionUrl: process.env.MONGOSESSIONURL
}

