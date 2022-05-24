/**
 * Module dependencies.
 */
import api from "./api";
import config from './config';
import ServerController from "./Server/Controllers/ServerController";

api.set("port", config.port);

//Serveur controller singleton.
const serverController = ServerController.getInstance(api);
serverController.start();
