import express from "express";
import cors from "cors";
import {ApiRouter} from "./routes";
import {HealthCheckRouter} from "./Healthcheck/Routes/HealthCheckRoutes";
import {AuthentificationRouter} from "./Authentification/Routes/AuthentificationRoutes";
import {UsersRouter} from "./Users/Routes/UsersRouter";
import {PersonnesRouter} from './Personnes/Routes/PersonnesRoutes';
import {OrganisationsRouter} from './Organisations/Routes/OrganisationsRoutes'
import {VerifyTokenMiddleware} from "./Authentification/Middleware/VerifyTokenMiddleware";
import {ApiErrorsRouter} from "./Http/Routes/ApiErrorsRouter";

/**
 * Main class for the API
 * Use the express instance as public property.
 */
class Api {
    public express: express.Application = express();
    public authRouters:any;

    constructor()
    {
        this._initMiddleware();
        this._initRouter();
    }


    private _initMiddleware()
    {
        // Add a list of allowed origins.
        const allowedOrigins = ['http://localhost:3000'],
            options: cors.CorsOptions = {
                origin: allowedOrigins
            };
        this.express.use(cors(options));

        // parse application/x-www-form-urlencoded
        //this.express.use(express.urlencoded({extended: false}));

        // parse application/json
        this.express.use(express.json());
    }


    private _initRouter()
    {
        this._initPublicRoutes();

        this.express.use("/", VerifyTokenMiddleware.middlewareFunction() as any);
        this.express.use("/", VerifyTokenMiddleware.addUserToResponse() as any);

        //Everything under here will need authorization token present in the request Header.
        this._needAuthentificationRoutes();
        this._defaultsRoutes();
    }


    private _initPublicRoutes()
    {
        //Auth Routes
        this.express.use("/", AuthentificationRouter);

        //main log and feedback from the API
        this.express.use("/", ApiRouter);

        //Tools the manage the health of the API
        this.express.use("/", HealthCheckRouter);
    }


    private _needAuthentificationRoutes()
    {
        // Users Routes
        this.express.use("/users", UsersRouter);

        //Personnes Routes
        this.express.use("/personne", PersonnesRouter);
        this.express.use("/personnes", PersonnesRouter);

        //Organisations Routes
        this.express.use("/organisations", OrganisationsRouter);
    }

    private _defaultsRoutes()
    {

        //this handle the 404
        this.express.use("/", ApiErrorsRouter);
    }
}

/**
 * Export an instance of the main API class and pass the Express.
 */
export default new Api().express;