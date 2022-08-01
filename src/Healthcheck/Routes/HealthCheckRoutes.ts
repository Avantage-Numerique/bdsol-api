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
        message: "You and me <3",
    };
    return res.status(200).send(response);
});

export {HealthCheckRouter};