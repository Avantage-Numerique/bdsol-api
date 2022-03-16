import express from "express";
import PingController from "../Controllers/PingController";

const HealthCheckRouter = express.Router();

HealthCheckRouter.get("/ping", async (_req, res) => {
    const controller = new PingController();
    const response = await controller.getMessage();
    return res.send(response);
});

export default HealthCheckRouter;