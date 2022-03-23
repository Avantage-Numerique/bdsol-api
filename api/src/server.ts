/**
 * Module dependencies.
 */
import api from "./api";
import config from './config';
import ServerController from "./Server/Controllers/ServerController";


api.set("port", config.port);

/**
 * Create HTTP server.
 */
//const server = http.createServer(api);
//server.listen(config.port);
//server.on("error", serverController.onError);
//server.on("listening", serverController.onListening);


const serverController = new ServerController(api);
serverController.start();
/**
 * Listen on provided port, on all network interfaces.
 */
/*server.listen(config.port, () => {
    //version = version || 'not set';
   // port = port || 'not set';
    console.log(`BDSOL API server (version ${config.version}) started listening on port: ${config.port}`);//@todo Add this string to a string manager.
});*/
//server.on("error", onError);
//server.on("listening", onListening);