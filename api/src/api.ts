import express from 'express';
import ApiRouter from "./routes";
import HealthCheckRouter from "./Healthcheck/Routes/HealthCheckRoutes";
import AuthentificationRouter from "./Authentification/Routes/AuthentificationRoutes";
import UserRoutes from "./Users/Routes/UserRoutes";


/**
 * Main class for the API
 * Use the express instance as public property.
 */
class Api {
    public express: express.Application = express();

    constructor() {
        this.initMiddleware();
        this.initRouter();
    }

    private initMiddleware() {

        this.express.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "http://localhost:3000");
            res.header("Access-Control-Allow-Credentials", "true");
            res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
            res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
            next();
        });

        // parse application/x-www-form-urlencoded
        //this.express.use(express.urlencoded({extended: false}));
        // this is the end
        // parse application/json
        this.express.use(express.json());
    }

    // check for migration to trigger ?

    private initRouter() {

        //main log and feedback from the API
        this.express.use("/", ApiRouter);

        //Tools the manage the health of the API
        this.express.use("/", HealthCheckRouter);

        // Auth Routes
        this.express.use("/", AuthentificationRouter);

        // Users Routes
        this.express.use("/users", UserRoutes);
    }
}

/**
 * Export an instance of the main API class and pass the Express.
 */
export default new Api().express;