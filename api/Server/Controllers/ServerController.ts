import express from 'express';
import * as http from "http";
import config from "../../config";
import LogHelper from "../../Monitoring/Helpers/LogHelper";


export default class ServerController {

    server: http.Server;
    api: express.Application;

    constructor(api: express.Application) {
        this.api = api;
        this.server = http.createServer(this.api);
        LogHelper.log('Départ de la configuration du serveur pour l\'API');
    }

    public start() {

        //version = version || 'not set';
        // port = port || 'not set';
        //console.log(`BDSOL API server (version ${config.version}) started listening on port: ${config.port}`);
        this.server = http.createServer(this.api);

        this.server.on("error", this.onError);
        this.server.on("listening", this.onListening);

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
        LogHelper.log(`BDSOL API server (version ${config.version}) started listening on port: ${config.port}`);
    }
}
