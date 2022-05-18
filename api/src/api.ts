import express from "express";
import cors from "cors";
import ApiRouter from "./routes";
import HealthCheckRouter from "./Healthcheck/Routes/HealthCheckRoutes";
import {AuthentificationRouter} from "./Authentification/Routes/AuthentificationRoutes";
import UserRoutes from "./Users/Routes/UserRoutes";
import PersonnesRouter from './Personnes/Routes/PersonnesRoutes';
import OrganisationsRouter from './Organisations/Routes/OrganisationsRoutes'
import {VerifyTokenMiddleware} from "./Authentification/Middleware/VerifyTokenMiddleware";

/**
 * Main class for the API
 * Use the express instance as public property.
 */
class Api {
    public express: express.Application = express();

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

    // check for migration to trigger ?

    private _initRouter()
    {

        this._initPublicRoutes();

        // @ts-ignore
        this.express.use("/", VerifyTokenMiddleware.middlewareFunction());//@todo fix the middleware from a class bug with return and params types.

        //Everything under here will need authorization token present in the request Header.
        this._needAuthentificationRoutes();
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
        this.express.use("/users", UserRoutes);

        //Personnes Routes
        this.express.use("/personne", PersonnesRouter);
        this.express.use("/personnes", PersonnesRouter);

        //Organisations Routes
        this.express.use("/organisations", OrganisationsRouter);
    }
}

/**
 * Export an instance of the main API class and pass the Express.
 */
export default new Api().express;