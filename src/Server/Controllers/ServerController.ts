import * as http from "http";
import config from "../../config";

import {
    DBDriver,
    MongooseDBDriver
} from "../../Database/DatabaseDomain";

import {ReasonPhrases,StatusCodes} from 'http-status-codes';
import LogHelper from "../../Monitoring/Helpers/LogHelper";
import Api from "../../api";

/**
 * Manage all the serveur actions and connect the app to the ROUTE.
 */
export default class ServerController {

    static database: DBDriver;

    server: http.Server;
    api: Api;

    static _singleton:ServerController;

    /**
     * Create an instance of ServerController with the express app.
     * @param api express.Application
     */
    constructor(api:Api)
    {
        //set the api if it's passed via instanciation.
        this.api = api;

        //this.api.serverController = this;
        LogHelper.log('Départ de la configuration du serveur pour l\'API');
        ServerController._setDBDriver();
    }

    /**
     * Le singleton du ServerController qu'on veut avoir seulement une instance.
     * @param api express.Application Pour initié et associé l'application express au projet.
     */
    static getInstance(api:Api)
    {
        if (ServerController._singleton === undefined) {
            ServerController._singleton = new ServerController(api);
        }
        return ServerController._singleton;
    }

    /**
     * Setup the database static property of ServerController for controlling the DB.
     * @private
     */
    private static _setDBDriver()
    {
        LogHelper.info(`[BD] Initiation du driver ${config.db.driver} de la base de données.`);

        if (config.db.driver === 'mongodb') {
            ServerController.database = new MongooseDBDriver();
            return;
        }
    }

    /**
     * Create an HTTP server from node.http, listence on error and on config.port.
     * Connect to the database
     */
    public async start()
    {
        this.server = http.createServer(this.api.express);

        this.server.on("error", this.onError);
        this.server.on("listening", this.onListening);

        try {
            await ServerController.database.connect();

        } catch(error: any) {
            LogHelper.error("[Server.start] Database connection failed", error);
            process.exit(StatusCodes.INTERNAL_SERVER_ERROR);
        }

        LogHelper.info("Démarrage de l'API");
        this.api.start();

        LogHelper.info('Configuration terminée, départ de l\'écoute sur le serveur');
        this.server.listen(config.port);
    }

    /**
     * When the API got and error. Will exit and
     * @param error
     */
    public onError(error: any)
    {
        if (error.syscall !== "listen")
        {
            throw error;
        }

        const bind = `Port ${config.port} `;

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
    public onListening()
    {
        LogHelper.log(`${config.appName} (version ${config.version}) répond sur le port: ${config.port}`);
    }

    /**
     * Method to concentrate the process of exiting the API, to control the steps in one place.
     * @param errorCode
     * @param message
     */
    public exitApi(errorCode:any, message:string)
    {
        LogHelper.error(message);
        process.exit(errorCode);
    }
}
