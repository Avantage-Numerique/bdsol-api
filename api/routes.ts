import express from "express";
//import HealthCheckRouter from "./Healthcheck/Routes/HealthCheckRoutes";

const ApiRouter = express.Router();

ApiRouter.get("/", async (req, res) => {
    let version = process.env.VERSION || 'not set';
    let port = process.env.PORT || 'not set';
    res.send(`BDSOL API server (version ${version}) started listening on port: ${port}`)//@todo create a default get html return.
});

export default ApiRouter;