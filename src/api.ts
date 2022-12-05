import express from "express";
import cors from "cors";
import config from "./config";
import {ApiRouter} from "./routes";
import {HealthCheckRouter} from "./Healthcheck/Routes/HealthCheckRoutes";
import {AuthentificationRoutes} from "./Authentification/Routes/AuthentificationRoutes";
import {UsersRoutes} from "./Users/Routes/UsersRouter";
import {PersonsRoutes} from './Persons/Routes/PersonsRoutes';
import {OrganisationsRoutes} from './Organisations/Routes/OrganisationsRoutes'
import {VerifyTokenMiddleware} from "./Authentification/Middleware/VerifyTokenMiddleware";
import {TaxonomyRoutes} from "./Taxonomy/Routes/TaxonomyRoutes";
import {PublicUserRequest} from "./Authentification/Middleware/PublicUserRequest";
import LogHelper from "./Monitoring/Helpers/LogHelper";
import {ApiErrorHandler} from "./Error/Middlewares/ApiErrorHandler";
import {UsersHistoryRoutes} from "./UserHistory/Routes/UsersHistoryRoutes";
import {GetRequestIp} from "./Monitoring/Middlewares/GetRequestIp";
import ModerationRoutes from "./Moderation/Schemas/Route/ModerationRoutes";
import SearchRoutes from "./Database/Search/SearchRoutes";

/**
 * Main class for the API
 * Use the express instance as public property.
 */
export default class Api {
    public express: express.Application = express();
    public mainRouter: express.Router;
    public authRouters:any;

    public baseRoutes:Array<any>;
    public entitiesRoutes:Array<any>;


    public start() {
        this._initEntitiesRouters();
        this._initBaseRoutes();
        this._initMiddleware();
        this._initRouter();
    }

    /**
     * Assign middlewares to express
     * @private
     */
    private _initMiddleware()
    {
        /**
         * [
         'http://bdsolapp.devlocal',
         'https://bdsolapp.devlocal',
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
         ]
         */
        // Add a list of allowed origins.
        const allowedOrigins = config.cors.allowedOrigins,
            options: cors.CorsOptions = {
                origin: allowedOrigins
            };

        this.express.use(cors(options));

        // parse application/x-www-form-urlencoded
        //this.express.use(express.urlencoded({extended: false}));

        // parse application/json
        this.express.use(express.json());
    }

    private _initBaseRoutes() {

        this.baseRoutes = [
            {
                manager: new AuthentificationRoutes()
            }
        ];
    }

    /**
     * Initiate the manager for the routes in one place and defined the route that will be used by express for them.
     * @private
     */
    private _initEntitiesRouters() {
        this.entitiesRoutes = [
            {
                baseRoute: "/users",
                manager: new UsersRoutes()
            },
            {
                baseRoute: "/taxonomies",
                manager: new TaxonomyRoutes()
            },
            {
                baseRoute: "/userhistory",
                manager: new UsersHistoryRoutes()
            },
            {
                baseRoute: "/persons",
                manager: new PersonsRoutes()
            },
            {
                baseRoute: "/organisations",
                manager: new OrganisationsRoutes()
            },
            {
                baseRoute: "/info",
                manager: new ModerationRoutes()
            },
            {
                baseRoute: "/search",
                manager: new SearchRoutes()
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
        LogHelper.info("[ROUTES] Configuration des routes de l'API ...");

        this.mainRouter = express.Router(); //this seeem to be a "branch" independant. Middle ware pass here, and error handling are only manage into the same "router's hierarchy" may I labled.
        this.mainRouter.use(GetRequestIp.middleware());    // Set an empty user property in Request there. Would be possible to feed with more default info.
        this.mainRouter.use(PublicUserRequest.middleware());    // Set an empty user property in Request there. Would be possible to feed with more default info.

        // All public routes
        this._initPublicRoutes();

        // All authentification routes.
        this._needAuthentificationRoutes();

        this.mainRouter.use(ApiErrorHandler.middlewareFunction());//Error handler. Catch error throwned and return a standardized json response about it, to be able to just throw error in between, and avoid managing json response everywhere.

        //assign all these routes to the app.
        this.express.use(this.mainRouter);
        LogHelper.info("[ROUTES] Configuration des routes terminés");
    }


    /**
     * Define the manager for each public routes.
     * @private
     */
    private _initPublicRoutes()
    {
        /**
         * Init all the base routes
         */
        for (const baseRoute of this.baseRoutes)
        {
            this.mainRouter.use(
                "/",
                baseRoute.manager.setupPublicRoutes()
            );
        }

        //this.mainRouter.use("/", RegistrationRouter);this is now manage by the AuthentificationController. But It should be a create in the User domain. @todo find a better design for this.

        //main log and feedback from the API
        this.mainRouter.use("/", ApiRouter);

        //Tools the manage the health of the API
        this.mainRouter.use("/", HealthCheckRouter);

        /**
         * Init all the entities routes from theirs managers.
         */
        for (const route of this.entitiesRoutes)
        {
            this.mainRouter.use(
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
         * Init all the base routes
         */
        for (const baseRoute of this.baseRoutes)
        {
            this.mainRouter.use(
                "/",
                baseRoute.manager.setupAuthRoutes()
            );
        }

        /**
         * Init all the entities routes from theirs managers.
         */
        for (const route of this.entitiesRoutes)
        {
            this.mainRouter.use(
                route.baseRoute,
                VerifyTokenMiddleware.middlewareFunction(),
                route.manager.setupAuthRoutes()
            );
        }
    }

}