import express from 'express';
import * as http from "http";
import config from "../../config";
import DBDriver from "../../Database/Drivers/DBDriver";
import FakeUserDBDriver from "../../Database/Drivers/FakeUserDBDriver";
import {ReasonPhrases,StatusCodes} from 'http-status-codes';
import LogHelper from "../../Monitoring/Helpers/LogHelper";
import MongooseDBDriver from "../../Database/Drivers/MongooseDriver";
import {UsersProvider} from "../../Database/Providers/UsersProvider";
import Provider from "../../Database/Providers/Provider";

/**
 * Manage all the serveur actions and connect the app to the ROUTE.
 */
export default class ServerController {

    static usersTable: string = 'users';
    static usersModel: any;
    static database: DBDriver;
    static userProvider: UsersProvider;
    static dataProvider: Provider;

    server: http.Server;
    api: express.Application;

    /**
     * Create an instance of ServerController with the express app.
     * @param api express.Application
     */
    constructor(api: express.Application) {
        this.api = api;
        this.server = http.createServer(this.api);
        ServerController._setDBDriver();
        LogHelper.log('Départ de la configuration du serveur pour l\'API');
    }

    /**
     * Setup the database static property of ServerController for controlling the DB.
     * @private
     */
    private static _setDBDriver() {

        LogHelper.log(`Initiation du driver ${config.db.driver} de la base de données.`);

        if (config.db.driver === 'mongodb') {
            ServerController.database = new MongooseDBDriver();
            return;
        }
        if (config.db.driver === 'fakeusers') {
            ServerController.database = new FakeUserDBDriver();
            return;
        }
    }

    /**
     * Create an HTTP server from node.http, listence on error and on config.port.
     * Connect to the database
     */
    public async start() {

        this.server = http.createServer(this.api);

        this.server.on("error", this.onError);
        this.server.on("listening", this.onListening);

        try {
            await ServerController.database.connect();

        } catch(error: any) {
            LogHelper.error("Database connection failed", error);
            process.exit(StatusCodes.INTERNAL_SERVER_ERROR);
        }

        LogHelper.log('Configuration terminée, départ de l\'écoute sur le serveur');
        this.server.listen(config.port);
    }

    /**
     * When the API got and error. Will exit and
     * @param error
     */
    public onError(error: any) {
        if (error.syscall !== "listen") {
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
    public onListening() {
        LogHelper.log(`${config.appName} (version ${config.version}) répond sur le port: ${config.port}`);
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
