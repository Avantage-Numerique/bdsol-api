import express from "express";
import AuthenficationController from "../Controllers/AuthentificationController";
import LogHelper from "../../Monitoring/Helpers/LogHelper";
import config from "../../config";
import {ReasonPhrases, StatusCodes} from "http-status-codes";
import {TokenController} from "../Controllers/TokenController";

// add { mergeParams: true } to get the main route params.
const AuthentificationRouter = express.Router();

// GET ENDPOINTS

//  LOGIN
AuthentificationRouter.get('/login',
    (req, res) => {
        LogHelper.warn('trying to access login with get method');
        return res.send('There is no place in eightyworld for login.');
    });


//  POST ENDPOINTS

/**
 * Post method to return a token if the user is in the DB
 * requête body en JSON :
 * username:string
 * password:string
 */
AuthentificationRouter.post('/login',
    async (req, res) => {

        const {username, password} = req.body;

        const controller = new AuthenficationController();
        const response = await controller.login(username, password);

        return res.status(response.code).send(response);
    });
/**
 * Post method to return a token if the user is in the DB
 * requête body en JSON :
 * username:string
 * password:string
 */
AuthentificationRouter.post('/logout',
    async (req, res) => {

        const {username} = req.body;

        const controller = new AuthenficationController();
        const response = await controller.logout(username);

        return res.status(response.code).send(response);
    });


/**
 * Post method to verify if a token is valid and if it isn't expired.
 * requête body en JSON :
 * token:string
 */
AuthentificationRouter.post('/verify-token',
    async (req, res) => {

        const {token} = req.body;

        const controller = new AuthenficationController();
        const response = await controller.verifyToken(token);

        //200: success, 401:not valid (unauthorized), 501: Mauvais driver de bd
        return res.status(response.code).send(response);
    });



/**
 * Post methodqui retourne un token pour un utilisateur.
 * requête body en JSON :
 * vide
 */
AuthentificationRouter.post('/generate-token',
    async (req, res) => {

        if (config.isDevelopment)
        {
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

export {AuthentificationRouter};