import * as http from "http";

import {DBDriver, MongooseDBDriver} from "../../Database/DatabaseDomain";

import {ReasonPhrases, StatusCodes} from 'http-status-codes';
import LogHelper from "../../Monitoring/Helpers/LogHelper";
import Api from "../../api";

/**
 * Manage all the serveur actions and connect the app to the ROUTE.
 */
export default class ServerController {

    static database: DBDriver;
    static api:Api;
    server: http.Server;
    //api: Api;

    static _singleton:ServerController;

    /**
     * Create an instance of ServerController with the express app.
     * @param api express.Application
     */
    constructor(api:Api) {
        //set the api if it's passed via instanciation.
        ServerController.api = api;
        ServerController.api.configure();
        ServerController._setDBDriver();
    }

    /**
     * Le singleton du ServerController qu'on veut avoir seulement une instance.
     * @param api express.Application Pour initié et associé l'application express au projet.
     */
    static getInstance(api:Api|null=null) {
        if (ServerController._singleton === undefined && api !== null) {
            ServerController._singleton = new ServerController(api);
        }
        if (ServerController._singleton) {
            return ServerController._singleton;
        }
        return;
    }

    /**
     * Setup the database static property of ServerController for controlling the DB.
     * @private
     */
    private static _setDBDriver() {
        LogHelper.info(`[BD] Initiation du driver ${ServerController.api.config.db.driver} de la base de données.`);

        if (ServerController.api.config.db.driver === 'mongodb') {
            ServerController.database = new MongooseDBDriver(ServerController.api.config.db);
            return;
        }
    }

    /**
     * Create an HTTP server from node.http, listence on error and on ServerController.api.config.port.
     * Connect to the database
     */
    public async start() {
        this.server = http.createServer(ServerController.api.express);

        this.server.on("error", this.onError);
        this.server.on("listening", this.onListening);

        try {
            await ServerController.database.connect();

        } catch(error: any) {
            LogHelper.error("[Server.start] Database connection failed", error);
            process.exit(StatusCodes.INTERNAL_SERVER_ERROR);
        }

        LogHelper.info("Démarrage de l'API");
        ServerController.api.start();

        LogHelper.info('Configuration terminée, départ de l\'écoute sur le serveur');
        this.server.listen(ServerController.api.config.port);
    }

    /**
     * When the API got and error. Will exit and
     * @param error
     */
    public onError(error: any) {
        if (error.syscall !== "listen") {
            throw error;
        }

        const bind = `Port ${ServerController.api.config.port} `;

        // handle specific listen errors with friendly messages
        switch (error.code) {
            case "EACCES":
                this.exitApi(StatusCodes.FORBIDDEN, bind + ReasonPhrases.FORBIDDEN);
                break;

            case "EADDRINUSE":
                this.exitApi(StatusCodes.INTERNAL_SERVER_ERROR, bind + "is already in use" + ReasonPhrases.INTERNAL_SERVER_ERROR);
                break;

            default:
                throw error;
        }
    }

    /**
     * Event listener for HTTP server "listening" on target port.
     * port is setup in the .env file.
     */
    public onListening() {
        LogHelper.log(`${ServerController.api.config.appName} (version ${ServerController.api.config.version}) répond sur le port: ${ServerController.api.config.port}`);
    }

    /**
     * Method to concentrate the process of exiting the API, to control the steps in one place.
     * @param errorCode
     * @param message
     */
    public exitApi(errorCode:any, message:string) {
        LogHelper.error(message);
        process.exit(errorCode);
    }
}
