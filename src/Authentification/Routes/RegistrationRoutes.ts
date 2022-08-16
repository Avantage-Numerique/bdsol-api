import express from "express";
import {RegistrationController} from "../Controllers/RegistrationController";
import LogHelper from "../../Monitoring/Helpers/LogHelper";

// add { mergeParams: true } to get the main route params.
const RegistrationRouter = express.Router();

// POST ENDPOINTS

//  LOGIN
RegistrationRouter.post('/register',
    async (req, res) => {
        const {data} = req.body;
        LogHelper.info("A user trying to register into the system with data :",data);
        const controller = new RegistrationController();
        const response = await controller.register(data);

        //200: success, 401:not valid (unauthorized), 501: Mauvais driver de bd
        return res.status(response.code).send(response);
    });

export {RegistrationRouter};