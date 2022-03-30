import express from "express";

const ApiRouter = express.Router();

ApiRouter.get("/", async (req, res) => {
    let version = process.env.VERSION || 'not set';
    let port = process.env.PORT || 'not set';
    res.send(`BDSOL API (version ${version}) écoute sur le port: ${port}`)//@todo create a default get html return.
});

ApiRouter.get("/test", async (req, res) => {
    res.send(`Testing ...`);
});

export default ApiRouter;