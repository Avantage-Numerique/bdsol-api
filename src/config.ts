//Init the .env file config vars.
import * as dotenv from "dotenv";
import path from "path";

const envFolder = process.env.ENV_FOLDER ?? '../';// ENV_FOLDER need to be declare in the node stack (outside of .env to work in staging and prod).
dotenv.config({path: path.join(__dirname, `${envFolder}.env`)});

const getApiConfig = () => {
    return {
        environnement: process.env.ENVIRONNEMENT || "development",
        logPerformance: process.env.LOG_PERFORMANCE || true,
        logToFile: process.env.LOG_TO_FILE === "true",
        envFolder: process.env.ENV_FOLDER ?? '../',

        isProduction: process.env.ENVIRONNEMENT === 'production',
        isStaging: process.env.ENVIRONNEMENT === 'staging',
        isDevelopment: process.env.ENVIRONNEMENT === 'development',

        // Dev configuration.
        mongooseDebug: process.env.ENVIRONNEMENT === 'development' && process.env.MONGOOSE_DEBUG === 'true' ,

        appName: process.env.APP_NAME || "API",
        port: process.env.PORT || "8001",
        version: process.env.VERSION || "0.0.8.default",
        serverPath: process.env.SERVER_PATH || path.join(__dirname, ".."),
        appPath: process.env.APP_PATH || path.join(__dirname, ".."),
        basepath: process.env.BASEPATH || path.join(__dirname, ".."),
        baseUrl: process.env.BASEURL || "http://localhost:8000",
        frontendAppUrl: process.env.FRONTEND_APP_URL || "http://localhost:3000",

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
            authSource: process.env.DB_AUTHSOURCE !== "false" && process.env.DB_AUTHSOURCE !== "0" ? process.env.DB_AUTHSOURCE : '',
            addAuthSource: process.env.DB_ADD_AUTHSOURCE === "true",
            additionalUrlParams: process.env.DB_ADDITIONAL_URL_PARAMS ? process.env.DB_ADDITIONAL_URL_PARAMS : '',// '&replicaSet=replicaset&tls=true',
            host: process.env.DB_HOST || "not set",
            hostName: process.env.DB_HOST_NAME || "not set",
            port: process.env.DB_PORT || 27017,
            user: process.env.DB_USER || '',
            password: process.env.DB_PASSWORD || '',
            name: process.env.DB_NAME || '',
            needPromise: process.env.DB_NEED_PROMISE === 'true',
            config: {
                createObjectIdForQuery: false
            }
        },

        localhostDb: {
            driver: process.env.LOCALHOST_DB_DRIVER || "mongodb",
            prefix: process.env.LOCALHOST_DB_PREFIX || "mongodb",
            authSource: process.env.LOCALHOST_DB_AUTHSOURCE !== "false" && process.env.LOCALHOST_DB_AUTHSOURCE !== "0" ? process.env.LOCALHOST_DB_AUTHSOURCE : '',
            addAuthSource: process.env.LOCALHOST_DB_ADD_AUTHSOURCE === "true",
            additionalUrlParams: process.env.LOCALHOST_DB_ADDITIONAL_URL_PARAMS ? process.env.LOCALHOST_DB_ADDITIONAL_URL_PARAMS : '',// '&replicaSet=replicaset&tls=true',
            host: process.env.LOCALHOST_DB_HOST || "not set",
            port: process.env.LOCALHOST_DB_PORT || 27017,
            user: process.env.LOCALHOST_DB_USER || '',
            password: process.env.LOCALHOST_DB_PASSWORD || '',
            name: process.env.LOCALHOST_DB_NAME || '',
            needPromise: process.env.LOCALHOST_DB_NEED_PROMISE === 'true',
            config: {
                createObjectIdForQuery: false
            }
        },

        distantDb: {
            driver: process.env.DISTANT_DB_DRIVER || "mongodb",
            prefix: process.env.DISTANT_DB_PREFIX || "mongodb",
            authSource: process.env.DB_AUTHSOURCE !== "false" && process.env.DB_AUTHSOURCE !== "0" ? process.env.DB_AUTHSOURCE : '',
            addAuthSource: process.env.DB_ADD_AUTHSOURCE === "true",
            additionalUrlParams: process.env.DISTANT_DB_ADDITIONAL_URL_PARAMS ? process.env.DISTANT_DB_ADDITIONAL_URL_PARAMS : '',// '&replicaSet=replicaset&tls=true',
            host: process.env.DISTANT_DB_HOST || "not set",
            port: process.env.DISTANT_DB_PORT || 27017,
            user: process.env.DISTANT_DB_USER || '',
            password: process.env.DISTANT_DB_PASSWORD || '',
            name: process.env.DISTANT_DB_NAME || '',
            needPromise: process.env.DISTANT_DB_NEED_PROMISE === 'true',
            config: {
                createObjectIdForQuery: false
            }
        },
        migrations: {
            driver: process.env.DB_MIGRATION_DRIVER || "mongodb",
            prefix: process.env.DB_MIGRATION_PREFIX || "mongodb",//use the same prefix of config.db
            authSource: process.env.DB_MIGRATION_AUTHSOURCE !== "false" && process.env.DB_MIGRATION_AUTHSOURCE !== "0" ? process.env.DB_MIGRATION_AUTHSOURCE : '',
            addAuthSource: process.env.DB_MIGRATION_ADD_AUTHSOURCE === "true",
            additionalUrlParams: process.env.DB_MIGRATION_ADDITIONAL_URL_PARAMS ? process.env.DB_MIGRATION_ADDITIONAL_URL_PARAMS : '',
            host: process.env.DB_MIGRATION_HOST || "not set",
            port: process.env.DB_MIGRATION_PORT || 27017,
            user: process.env.DB_MIGRATION_USER || '',
            password: process.env.DB_MIGRATION_PASSWORD || '',
            name: process.env.DB_MIGRATION_DB_NAME || '',
            needPromise: process.env.DB_MIGRATION_NEED_PROMISE === 'true',
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
        },
        notifications: {
            email: {
                server: process.env.MAIL_SERVEUR ?? "mailhog",
                port: process.env.MAIL_PORT ?? 1025,
                user: process.env.MAIL_USER ?? "usernamemailhog",
                password: process.env.MAIL_PASSWORD ?? "usernamemailhog",
                from: "notifications@avnu.ca",
                replyTo: "bonjour@avnu.ca",
                tls: process.env.MAIL_SECURE === "true"
            }
        }
    }
}

const config:any = getApiConfig();

export default config;
export {getApiConfig};