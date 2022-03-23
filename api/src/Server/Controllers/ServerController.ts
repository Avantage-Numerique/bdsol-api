import express from 'express';
import * as http from "http";
import LogHelper from "../../Monitoring/Helpers/LogHelper";
import config from "../../config";
import MongoDBDriver, {DBDriver} from "../../Database/Drivers/MongoDBDriver";

export default class ServerController {

    server: http.Server;
    api: express.Application;
    database: DBDriver;

    constructor(api: express.Application) {
        this.api = api;
        this.server = http.createServer(this.api);
        this.database = new MongoDBDriver();
        LogHelper.log('Départ de la configuration du serveur pour l\'API');
    }

    public async start() {

        //version = version || 'not set';
        // port = port || 'not set';
        //console.log(`BDSOL API server (version ${config.version}) started listening on port: ${config.port}`);
        this.server = http.createServer(this.api);

        this.server.on("error", this.onError);
        this.server.on("listening", this.onListening);

        try {
            await this.database.connect();
            LogHelper.log('Connexion à la base de données ...');

        } catch(error: any) {
            LogHelper.error("Database connection failed", error);
            process.exit();
        }

        LogHelper.log('Configuration terminée, départ de l\'écoute sur le serveur');
        this.server.listen(config.port);
    }

    public onError(error: any) {
        if (error.syscall !== "listen") {
            throw error;
        }

        const bind = "Port " + config.port;

        // handle specific listen errors with friendly messages
        switch (error.code) {
            case "EACCES":
                LogHelper.error(bind + " requires elevated privileges");
                process.exit(1);
                break;
            case "EADDRINUSE":
                LogHelper.error(bind + " is already in use");
                process.exit(1);
                break;
            default:
                throw error;
        }
    }

    /**
     * Event listener for HTTP server "listening" event.
     */
    public onListening() {
        LogHelper.log(`BDSOL API (version ${config.version}) répond sur le port: ${config.port}`);
    }
}
