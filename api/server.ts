/**
 * Module dependencies.
 */
import http from "http";
import api from "./api";

/**
 * Get port from environment and store in Express.
 */
var port = process.env.PORT || "8000";
var version = process.env.VERSION || "0.0.2";

api.set("port", port);

/**
 * Create HTTP server.
 */
const server = http.createServer(api);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => {
    //version = version || 'not set';
   // port = port || 'not set';
    console.log(`BDSOL API server (version ${version}) started listening on port: ${port}`);//@todo Add this string to a string manager.
});
//server.on("error", onError);
//server.on("listening", onListening);