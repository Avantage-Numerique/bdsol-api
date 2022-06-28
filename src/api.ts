import express from "express";
import cors from "cors";
import {ApiRouter} from "./routes";
import {HealthCheckRouter} from "./Healthcheck/Routes/HealthCheckRoutes";
import {AuthentificationRouter} from "./Authentification/Routes/AuthentificationRoutes";
import {UsersRoutes} from "./Users/Routes/UsersRouter";
import {PersonnesRoutes} from './Personnes/Routes/PersonnesRoutes';
import {OrganisationsRoutes} from './Organisations/Routes/OrganisationsRoutes'
import {VerifyTokenMiddleware} from "./Authentification/Middleware/VerifyTokenMiddleware";
import {RegistrationRouter} from "./Authentification/Routes/RegistrationRoutes";

/**
 * Main class for the API
 * Use the express instance as public property.
 */
export default class Api {
    public express: express.Application = express();
    public authRouters:any;

    public entitiesRoutes:Array<any>;

    public start() {
        this._initEntitiesRouters();
        this._initMiddleware();
        this._initRouter();
    }

    /**
     * Assign middlewares to express
     * @private
     */
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

    /**
     * Initiate the manager for the routes in one place and defined the route that will be used by express for them.
     * @private
     */
    private _initEntitiesRouters() {
        this.entitiesRoutes = [
            {
                baseRoute: "/personnes",
                manager: new PersonnesRoutes()
            },
            {
                baseRoute: "/users",
                manager: new UsersRoutes()
            },
            {
                baseRoute: "/organisations",
                manager: new OrganisationsRoutes()
            }
        ];
    }


    /**
     * Main function that start all the routes and their manager.
     * For public or connected one.
     * @private
     */
    private _initRouter()
    {
        this._initPublicRoutes();

        // @ts-ignore
        this.express.use("/", VerifyTokenMiddleware.middlewareFunction());

        //Everything under here will need authorization token present in the request Header.
        this._needAuthentificationRoutes();
    }


    /**
     * Define the manager for each public routes.
     * @private
     */
    private _initPublicRoutes()
    {
        //Auth Routes
        this.express.use("/", AuthentificationRouter);
        this.express.use("/", RegistrationRouter);

        //main log and feedback from the API
        this.express.use("/", ApiRouter);

        //Tools the manage the health of the API
        this.express.use("/", HealthCheckRouter);

        /**
         * Init all the entities routes from theirs managers.
         */
        for (let route of this.entitiesRoutes)
        {
            this.express.use(
                route.baseRoute,
                route.manager.setupPublicRoutes()
            );
        }

    }

    /**
     * Define the routes that will need authentification for.
     * @private
     */
    private _needAuthentificationRoutes()
    {
        /**
         * Init all the entities routes from theirs managers.
         */
        for (let route of this.entitiesRoutes)
        {
            this.express.use(
                route.baseRoute,
                route.manager.setupRoutes()
            );
        }
    }

}