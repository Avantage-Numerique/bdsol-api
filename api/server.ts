/**
 * Module dependencies.
 */
import http from "http";
import api from "./api";
import config from './config';


api.set("port", config.port);

/**
 * Create HTTP server.
 */
const server = http.createServer(api);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(config.port, () => {
    //version = version || 'not set';
   // port = port || 'not set';
    console.log(`BDSOL API server (version ${config.version}) started listening on port: ${config.port}`);//@todo Add this string to a string manager.
});
//server.on("error", onError);
//server.on("listening", onListening);