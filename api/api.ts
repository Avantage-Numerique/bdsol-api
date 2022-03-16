import express from 'express';
import ApiRouter from "./routes";
import * as dotenv from "dotenv";
dotenv.config();

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
        this.express.use(express.urlencoded({extended: false}));

        // parse application/json
        this.express.use(express.json());
    }

    private initRouter() {
        this.express.use("/", ApiRouter);
    }
}

/**
 * Export an instance of the main API class and pass the Express.
 */
export default new Api().express;