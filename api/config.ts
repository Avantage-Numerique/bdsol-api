
//Init the .env file config vars.
import * as dotenv from "dotenv";

dotenv.config();

const config = {

    port: process.env.PORT || "8000",
    version: process.env.VERSION || "0.0.0",
    tokenSecret: process.env.JWT_KEY || "not set",
    tokenSecureSecret: process.env.SECURE_JWT_KEY || "not set",

    db: {
        driver: process.env.DB_DRIVER || "mongodb",
        host: process.env.DB_HOST || "not set",
        port: process.env.DB_PORT || 27017,
        user: process.env.DB_USER || '',
        password: process.env.DB_PASSWORD || '',
    }
};

export default config;