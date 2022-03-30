import express from 'express';
import * as http from "http";
import LogHelper from "../../Monitoring/Helpers/LogHelper";
import config from "../../config";
import DBDriver from "../../Database/Drivers/DBDriver";
import MongoDBDriver from "../../Database/Drivers/MongoDBDriver";
import FakeUserDBDriver from "../../Database/Drivers/FakeUserDBDriver";

/**
 * Manage all the serveur actions and connect the app to the ROUTE.
 */
export default class ServerController {

    server: http.Server;
    api: express.Application;
    static usersTable: string = 'users';
    static usersModel: any;
    static database: DBDriver;

    constructor(api: express.Application) {
        this.api = api;
        this.server = http.createServer(this.api);
        ServerController._setDBDriver();
        LogHelper.log('Départ de la configuration du serveur pour l\'API');
    }

    private static _setDBDriver() {
        LogHelper.log(`Initiation du driver ${config.db.driver} de la base de données.`);
        if (config.db.driver === 'mongodb') {
            ServerController.database = new MongoDBDriver();
            return;
        }
        if (config.db.driver === 'fakeusers') {
            ServerController.database = new FakeUserDBDriver();
            return;
        }
    }

    public static setUsersModelCollection() {
        LogHelper.log(`Initiation des utilisateurs.`);

        ServerController.usersModel = ServerController.database.getModel(ServerController.usersTable);
        ServerController.usersModel.collection = ServerController.database.getCollection(ServerController.usersTable);

        ServerController.database.getModel(ServerController.usersTable).collection = ServerController.database.getCollection(ServerController.usersTable);

        return ServerController.usersModel;
    }

    public async start() {

        this.server = http.createServer(this.api);

        this.server.on("error", this.onError);
        this.server.on("listening", this.onListening);

        try {
            await ServerController.database.connect();

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
