import express from "express";
import cors from "cors";
import * as Nunjucks from "nunjucks";
import {getApiConfig} from "./config";
import {ApiRouter} from "./routes";
import {HealthCheckRouter} from "./Healthcheck/Routes/HealthCheckRoutes";
import {AuthentificationRoutes} from "@auth/Routes/AuthentificationRoutes";
import {UsersRoutes} from "./Users/Routes/UsersRouter";
import {PersonsRoutes} from './Persons/Routes/PersonsRoutes';
import {OrganisationsRoutes} from './Organisations/Routes/OrganisationsRoutes'
import {TaxonomyRoutes} from "./Taxonomy/Routes/TaxonomyRoutes";
import {UsersHistoryRoutes} from "./UserHistory/Routes/UsersHistoryRoutes";
import {MediasRoutes} from "./Media/Routes/MediasRoutes";
import {verifyTokenMiddleware} from "@auth/Middleware/VerifyTokenMiddleware";
import {PublicUserRequest} from "@auth/Middleware/PublicUserRequest";
import LogHelper from "./Monitoring/Helpers/LogHelper";
import {ApiErrorHandler} from "./Error/Middlewares/ApiErrorHandler";
import {GetRequestIp} from "./Monitoring/Middlewares/GetRequestIp";
import ModerationRoutes from "./Moderation/Routes/ModerationRoutes";
import SearchRoutes from "./Database/Search/SearchRoutes";
import {StaticContentsRoutes} from "./StaticContent/Routes/StaticContentsRoutes";
import {ProjectsRoutes} from "./Projects/Routes/ProjectsRoute";
import {RequestDuration} from "./Monitoring/Middlewares/RequestDuration";
import {AdminRoutes} from "@src/Admin/Routes/AdminRoutes";
import JobScheduler from "@src/Schedule/JobScheduler";
import {JobSheet} from "@src/Schedule/Sheet";
import {EventsRoutes} from "./Events/Routes/EventsRoutes";
import {PlacesRoutes} from "./Places/Routes/PlacesRoutes";
import EquipmentRoutes from "./Equipment/Routes/EquipmentRoute";
import CommunicationsRoutes from "./Communications/Routes/CommunicationsRoutes";
import {MonitoringRoutes} from "@src/Monitoring/Routes/MonitoringRoutes";
import EmbedTaxonomiesMetas from "@src/Schedule/Jobs/EmbedTaxonomiesMetas";
import {BackukDbJob} from "@src/Schedule/Jobs/BackupDb";
import {PagesRoutes} from "@src/Pages/Routes/PagesRoutes";

/**
 * Main class for the API
 * Use the express instance as public property.
 */
export default class Api {
    public express: express.Express = express();
    public templateSystem:Nunjucks.Environment;
    public templateBasePath:string;
    public mainRouter: express.Router;
    public authRouters: express.Router;

    public baseRoutes:Array<any>;
    public entitiesRoutes:Array<any>;

    public scheduler:JobScheduler;
    private _config:any;
    constructor() {
    }


    public start() {
        this._initEntitiesRouters();
        this._initBaseRoutes();
        this._initMiddleware();
        this._initRouter();
        this._initScheduler();
    }

    public configure() {
        LogHelper.info("initiating api configuration.");
        this._config = getApiConfig();
        this.express.set("port", this._config.port);
    }

    /**
     * Assign middlewares to express
     * @private
     */
    private _initMiddleware()
    {
        // Add a list of allowed origins.
        const allowedOrigins = this._config.cors.allowedOrigins,
            options: cors.CorsOptions = {
                origin: allowedOrigins
            };

        this.express.use(cors(options));

        // parse application/x-www-form-urlencoded
        //this.express.use(express.urlencoded({extended: false}));

        // parse application/json
        this.express.use(express.json());

        this.templateBasePath = `${this._config.appPath}/views`;
        //Templates and rendering
        this.templateSystem = Nunjucks.configure(this.templateBasePath, {
            express: this.express,
            autoescape: true
        });
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
                baseRoute: "/userhistories",
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
                baseRoute: "/projects",
                manager: new ProjectsRoutes()
            },
            {
                baseRoute: "/events",
                manager: new EventsRoutes()
            },
            {
                baseRoute: "/places",
                manager: new PlacesRoutes()
            },
            {
                baseRoute: "/equipment",
                manager: new EquipmentRoutes()
            },
            {
                baseRoute: "/info",
                manager: new ModerationRoutes()
            },
            {
                baseRoute: "/communications",
                manager: new CommunicationsRoutes()
            },
            {
                baseRoute: "/search",
                manager: new SearchRoutes()
            },
            {
                baseRoute: "/medias",
                manager: new MediasRoutes()
            },
            {
                baseRoute: "/static",
                manager: new StaticContentsRoutes()
            },
            {
                baseRoute: "/monitoring",
                manager: new MonitoringRoutes()
            },
            {
                baseRoute: "/",
                manager: new PagesRoutes()
            }
        ];
        // If dev, add admin routes.
        if (this._config.environnement === 'development') {
            this.entitiesRoutes.push({
                baseRoute: "/admin",
                manager: new AdminRoutes()
            })
        }
    }


    /**
     * Main function that start all the routes and their manager.
     * For public or connected one.
     * @private
     */
    private _initRouter()
    {
        LogHelper.info("[ROUTES] Configuration des routes de l'API ...");

        if (this._config.logPerformance) this.express.use(RequestDuration.middleware());

        this.mainRouter = express.Router(); //this seeem to be a "branch" independant. Middle ware pass here, and error handling are only manage into the same "router's hierarchy" may I labled.
        this.mainRouter.use(GetRequestIp.middleware());    // Set an empty user in req.visitor property in Request there. Would be possible to feed with more default info.
        this.mainRouter.use(PublicUserRequest.middleware());    // Set an empty user property in Request there. Would be possible to feed with more default info.
        //this.mainRouter.use(IsMongooseConnected.middleware());    // Set an empty user property in Request there. Would be possible to feed with more default info.

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
         * We seperate this to be able to add some route that don't need session. but still keep the scope of responsability
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
                verifyTokenMiddleware,
                route.manager.setupAuthRoutes()
            );
        }
    }

    private _initScheduler() {

        this.scheduler = new JobScheduler();

        const jobSheets:Array<JobSheet> = [
            this.scheduler.createSheet("Embed Taxonomy's metas (entities count, etc.", EmbedTaxonomiesMetas, this.scheduler.createRule('hour', 23)),
            this.scheduler.createSheet("Backuping BD", BackukDbJob, this.scheduler.createRule('hour', 0))
        ];
        LogHelper.info("[Jobs] Registred and strating scheduler.");
        this.scheduler.init(jobSheets);

    }

    get config():any {
        return this._config;
    }

}