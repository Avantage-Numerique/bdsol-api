import express from "express";
import LogHelper from "../../Monitoring/Helpers/LogHelper";
import type {ApiResponseContract} from "../../Http/Responses/ApiResponse";
import {UserController} from "../Controllers/UserController";

// add { mergeParams: true } to get the main route params.
const UsersRouter = express.Router();

//  CRUD


// USER/UPDATE

UsersRouter.post('/update', async (req, res, ) => {
    const {data} = req.body;
    LogHelper.info(`Update request on users route with this data`, data);
    const controller = new UserController();
    const response:ApiResponseContract = await controller.update(data.id, data);
    return res.status(response.code).send(response);
});


// USERS/CREATE

UsersRouter.post('/create', async (req, res) => {
    const {data} = req.body;
    LogHelper.log(`Received`, req.body, `Create user ${data}`);
    const controller = new UserController();
    const response:any = await controller.create(data);
    return res.status(response.code).send(response);
});


UsersRouter.post('/get', async (req, res) => {
    const {data} = req.body;
    LogHelper.log(`Received`, req.body, `Create user ${data}`);
    const controller = new UserController();
    const response:any = await controller.get(data);
    return res.status(response.code).send(response);
});

UsersRouter.post('/delete', async (req, res) => {
    const {data} = req.body;
    LogHelper.log(`Received`, req.body, `Delete user ${data}`);
    const controller = new UserController();
    const response:any = await controller.delete(data);
    return res.status(response.code).send(response);
});

export {UsersRouter};