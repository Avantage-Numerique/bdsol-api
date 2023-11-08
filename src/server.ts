/**
 * Module dependencies.
 */
import Api from "@src/api";
import config from '@src/config';
import ServerController from "@src/Server/Controllers/ServerController";

const api = new Api();
api.express.set("port", config.port);

//Serveur controller singleton.
const serverController = ServerController.getInstance(api);
if (serverController !== undefined) serverController.start();

export {api, serverController};