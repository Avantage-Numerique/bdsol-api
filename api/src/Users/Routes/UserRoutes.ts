import express from "express";
import AuthenficationController from "../Controllers/UserController";
import LogHelper from "../../Monitoring/Helpers/LogHelper";

// add { mergeParams: true } to get the main route params.
const UserRouter = express.Router();

//  LOGIN
UserRouter.get('/user', (req, res) => {
    LogHelper.warn('trying to access login with get method');
    return res.send('There is no place in eightyworld for login.');
});

UserRouter.post('/login', async (req, res) => {
    let {username, password} = req.body;
    const controller = new AuthenficationController();
    const response = await controller.login(username, password);
    return res.status(response.code).send(response);
});

export default UserRouter;