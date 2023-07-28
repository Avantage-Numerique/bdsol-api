/**
 * Module dependencies.
 */
import Api from "@src/api";
import config from '@src/config';
import ServerController from "@src/Server/Controllers/ServerController";
import JobScheduler from "@src/Schedule/JobScheduler";

const api = new Api();
api.express.set("port", config.port);

//Serveur controller singleton.
const serverController = ServerController.getInstance(api);
serverController.start();

const scheduler:JobScheduler = new JobScheduler();
scheduler.init();

export {api, serverController};