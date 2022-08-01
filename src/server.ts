/**
 * Module dependencies.
 */
import Api from "./api";
import config from './config';
import ServerController from "./Server/Controllers/ServerController";

const api = new Api();
api.express.set("port", config.port);

//Serveur controller singleton.
const serverController = ServerController.getInstance(api);
serverController.start();
