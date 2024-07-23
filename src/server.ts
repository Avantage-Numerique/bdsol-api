/**
 * Module dependencies.
 */
import Api from "@src/api";
import ServerController from "@src/Server/Controllers/ServerController";

const api = new Api();

//Serveur controller singleton.
const serverController = ServerController.getInstance(api);
if (serverController !== undefined) serverController.start();

export {api, serverController};