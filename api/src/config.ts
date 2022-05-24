
//Init the .env file config vars.
import * as dotenv from "dotenv";

dotenv.config();

const config = {

    environnement: process.env.ENVIRONNEMENT || "development",
    isProduction: process.env.ENVIRONNEMENT === 'production',
    isStaging: process.env.ENVIRONNEMENT === 'staging',
    isDevelopment: process.env.ENVIRONNEMENT === 'development',

    appName: process.env.APP_NAME || "API",
    port: process.env.PORT || "8000",
    version: process.env.VERSION || "0.0.0",

    tokenSecret: process.env.JWT_KEY || "not set yet",
    tokenSecureSecret: process.env.SECURE_JWT_KEY || "not set securely :P",

    db: {
        driver: process.env.DB_DRIVER || "mongodb",
        host: process.env.DB_HOST || "not set",
        port: process.env.DB_PORT || 27017,
        user: process.env.DB_USER || '',
        password: process.env.DB_PASSWORD || '',
        name: process.env.DB_NAME || '',
        config: {
            createObjectIdForQuery: false
        }
    },
    users: {
        db: {
            user: process.env.USERS_DB_USER || '',
            password: process.env.USERS_DB_PASSWORD || '',
            name: process.env.USERS_DB_NAME || '',
        }
    },
    jwt: {
        defaultOptions: {
            expiresIn: '24h',
        },
        requestAdditionalTime: 15//in minutes
    },
    query: {
        defaultSkip: process.env.QUERY_DEFAULT_SKIP || 0,
        defaultLimit: process.env.QUERY_DEFAULT_LIMIT || 10,
    }
};

export default config;