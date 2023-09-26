//Init the .env file config vars.
import * as dotenv from "dotenv";

dotenv.config();

const config:any = {

    environnement: process.env.ENVIRONNEMENT || "development",
    logPerformance: process.env.LOG_PERFORMANCE || true,

    isProduction: process.env.ENVIRONNEMENT === 'production',
    isStaging: process.env.ENVIRONNEMENT === 'staging',
    isDevelopment: process.env.ENVIRONNEMENT === 'development',

    // Dev configuration.
    mongooseDebug: process.env.ENVIRONNEMENT === 'development' && process.env.MONGOOSE_DEBUG === 'true' ,

    appName: process.env.APP_NAME || "API",
    port: process.env.PORT || "8000",
    version: process.env.VERSION || "0.0.0",
    basepath: process.env.BASEPATH || "/api/",

    tokenSecret: process.env.JWT_KEY || "not set yet",
    tokenSecureSecret: process.env.SECURE_JWT_KEY || "not set securely :P",

    cors: {
        allowedOrigins: process.env.CORS_ALLOWED_ORIGINS ? process.env.CORS_ALLOWED_ORIGINS.split(' ') : [
            'http://bdsolapp.devlocal',
            'https://bdsolapp.devlocal',
            'http://localhost:3000',
            'https://localhost:3000'
        ]
    },

    db: {
        driver: process.env.DB_DRIVER || "mongodb",
        prefix: process.env.DB_PREFIX || "mongodb",
        authSource: process.env.DB_AUTHSOURCE || 'admin',
        additionalUrlParams: process.env.DB_ADDITIONAL_URL_PARAMS ? process.env.DB_ADDITIONAL_URL_PARAMS : '',// '&replicaSet=replicaset&tls=true',
        host: process.env.DB_HOST || "not set",
        port: process.env.DB_PORT || 27017,
        user: process.env.DB_USER || '',
        password: process.env.DB_PASSWORD || '',
        name: process.env.DB_NAME || '',
        config: {
            createObjectIdForQuery: false
        }
    },
    migrations: {
        driver: process.env.DB_MIGRATION_DRIVER || "mongodb",
        prefix: process.env.DB_PREFIX || "mongodb",//use the same prefix of config.db
        authSource: process.env.DB_AUTHSOURCE || 'admin',
        additionalUrlParams: '&replicaSet=replicaset&tls=true',
        host: process.env.DB_MIGRATION_HOST || "not set",
        port: process.env.DB_MIGRATION_PORT || 27017,
        user: process.env.DB_MIGRATION_USER || '',
        password: process.env.DB_MIGRATION_PASSWORD || '',
        name: process.env.DB_MIGRATION_DB_NAME || '',
        config: {
            createObjectIdForQuery: false
        }
    },
    users: {
        db: {
            user: process.env.USERS_DB_USER || '',
            password: process.env.USERS_DB_PASSWORD || '',
            name: process.env.USERS_DB_NAME || '',
        },
        migrations: {
            driver: process.env.DB_MIGRATION_DRIVER || "mongodb",
            host: process.env.DB_MIGRATION_HOST || "not set",
            port: process.env.DB_MIGRATION_PORT || 27017,
            user: process.env.USERS_DB_MIGRATION_USER || '',
            password: process.env.USERS_DB_MIGRATION_PASSWORD || '',
            name: process.env.USERS_DB_MIGRATION_DB_NAME || '',
            config: {
                createObjectIdForQuery: false
            }
        },
        roles: {
            default: "default"
        }
    },
    jwt: {
        defaultOptions: {
            expiresIn: '24h',
        },
        requestAdditionnalTime: '15m'
    },
    query: {
        defaultSkip: process.env.QUERY_DEFAULT_SKIP || 0,
        defaultLimit: process.env.QUERY_DEFAULT_LIMIT || 100,
    }
};

export default config;