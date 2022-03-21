import express from "express";
import AuthenficationController from "../Controllers/AuthenficationController";
import LogHelper from "../../Monitoring/Helpers/LogHelper";

// add { mergeParams: true } to get the main route params.
const AuthentificationRouter = express.Router();

//  LOGIN
AuthentificationRouter.get('/login', (req, res) => {
    LogHelper.log('[WARNING] trying to access login with get method');
    return res.send('There is no place in eightyworld for login.');
});

AuthentificationRouter.post('/login', async (req, res) => {
    let {username, password} = req.body;
    const controller = new AuthenficationController();
    const response = await controller.login(username, password);
    return res.send(response);
});

export default AuthentificationRouter;