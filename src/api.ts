import express, {NextFunction, Response} from "express";
import cors from "cors";
import {ApiRouter} from "./routes";
import {HealthCheckRouter} from "./Healthcheck/Routes/HealthCheckRoutes";
import {AuthentificationRouter} from "./Authentification/Routes/AuthentificationRoutes";
import {UsersRoutes} from "./Users/Routes/UsersRouter";
import {PersonnesRoutes} from './Personnes/Routes/PersonnesRoutes';
import {OrganisationsRoutes} from './Organisations/Routes/OrganisationsRoutes'
import {VerifyTokenMiddleware} from "./Authentification/Middleware/VerifyTokenMiddleware";
import {RegistrationRouter} from "./Authentification/Routes/RegistrationRoutes";
import { OccupationsRoutes } from "./Taxonomie/Occupation/Routes/OccupationsRoutes";
import AuthRequest from "./Authentification/Types/AuthRequest";
import LogHelper from "./Monitoring/Helpers/LogHelper";

/**
 * Main class for the API
 * Use the express instance as public property.
 */
export default class Api
{
    public express: express.Application = express();
    public authRouters:any;

    public entitiesRoutes:Array<any>;

    public start() {
        this._initMiddleware();
        this._initEntitiesRouters();
        this._initRouter();


    }

    /**
     * Assign middlewares to express
     * @private
     */
    private _initMiddleware()
    {
        // Add a list of allowed origins.
        const allowedOrigins = [
                'http://localhost:3000',
                'https://localhost:3000',
                'http://localhost',
                'https://localhost',
                'http://51.222.24.157',
                'https://51.222.24.157',
                'http://51.222.24.157:3000',
                'https://51.222.24.157:3000',
                'http://bdsol.avantagenumerique.org',
                'https://bdsol.avantagenumerique.org',
                'http://bdsol.avantagenumerique.org:3000',
                'https://bdsol.avantagenumerique.org:3000'
            ],
            allowedOrigins2 = 'http://localhost:3000',
            options: cors.CorsOptions = {
                origin: allowedOrigins
            };

        //this enable all preflight cross origin check.
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
            },
            {
                baseRoute: "/occupations",
                manager: new OccupationsRoutes()
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
        for (const route of this.entitiesRoutes)
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
        for (const route of this.entitiesRoutes)
        {
            this.express.use(
                route.baseRoute,
                route.manager.setupRoutes()
            );
        }
    }

}