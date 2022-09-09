import express from "express";
import PingController from "../Controllers/PingController";

const HealthCheckRouter = express.Router();

HealthCheckRouter.get("/ping", async (_req, res) => {
    const controller = new PingController();
    const response = await controller.ping();
    return res.status(response.code).json(response);
});

HealthCheckRouter.post("/ping", async (_req, res) => {
    const controller = new PingController();
    const response = await controller.ping();
    return res.status(response.code).json(response);
});

HealthCheckRouter.get("/authors", async (_req, res) => {
    const response = {
        message: "L'équipe de la BDSOL : Vincent, Frédéric et Marc-André, et bientôt le code de l'équipe d'HUB01 sera aussi des auteurs :)",
    };
    return res.status(200).send(response);
});

export {HealthCheckRouter};