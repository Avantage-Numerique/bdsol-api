import express from "express";
import AuthenficationController from "../Controllers/AuthentificationController";
import LogHelper from "../../Monitoring/Helpers/LogHelper";
import config from "../../config";
import {ReasonPhrases, StatusCodes} from "http-status-codes";
import {TokenController} from "../Controllers/TokenController";

// add { mergeParams: true } to get the main route params.
const AuthentificationRouter = express.Router();

//  LOGIN
AuthentificationRouter.get('/login',
    (req, res) => {
        LogHelper.warn('trying to access login with get method');
        return res.send('There is no place in eightyworld for login.');
    });

AuthentificationRouter.post('/login',
    async (req, res) => {

        const {username, password} = req.body;

        const controller = new AuthenficationController();
        const response = await controller.login(username, password);

        return res.status(response.code).send(response);
    });


AuthentificationRouter.post('/generate-token',
    async (req, res) => {

        if (config.isDevelopment) {
            const token = TokenController.generate({ user_id: "6271b8ceee860ac5d96a32be", username: "datageek", role: "admin" });

            return res.status(StatusCodes.OK).send({
                "message": ReasonPhrases.OK,
                "token": token
            });
        }
        return res.status(StatusCodes.UNAUTHORIZED).json({
            "message": ReasonPhrases.UNAUTHORIZED
        });

    });

export default AuthentificationRouter;