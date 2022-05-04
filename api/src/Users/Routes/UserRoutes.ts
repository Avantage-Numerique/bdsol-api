import express from "express";
import {UserController} from "../UsersDomain";
import LogHelper from "../../Monitoring/Helpers/LogHelper";
import {StatusCodes} from "http-status-codes";
import {ApiResponseContract} from "../../Http/Responses/ApiResponse";

// add { mergeParams: true } to get the main route params.
const UserRouter = express.Router();

//  CRUD


// USER/UPDATE

UserRouter.post('/update', async (req, res) => {

    let {data} = req.body;
    LogHelper.info(`Update request on users route with this data`, data);

    //await ajoute avant le try.
    try {

        LogHelper.info(`Update user id : ${data.id}`);

        const controller = new UserController();
        const response:ApiResponseContract = await controller.update(data.id, data);

        LogHelper.info(`User id : ${data.id} update response`, response);

        return res.status(response.code).send(response);

    } catch (errors:any) {
        LogHelper.error(errors, "update - error catch");
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            error: true,
            code: StatusCodes.INTERNAL_SERVER_ERROR,
            message: errors.errmsg || "Not able to update the queried items",
            errors: errors.errors
        });
    }
});


// USERS/CREATE

UserRouter.post('/create', async (req, res) => {

    let {data} = req.body;
    LogHelper.log(`Received`, req.body, `Create user ${data}`);

    try {
        const controller = new UserController();
        const response:any = await controller.create(data);
        return res.status(response.code).send(response);

    } catch (errors:any) {
        return {
            error: true,
            code: StatusCodes.INTERNAL_SERVER_ERROR,
            message: errors.errmsg || "Not able to get the queried items",
            errors: errors.errors
        };
    }
});


UserRouter.post('/get', async (req, res) => {
    let {data} = req.body;
    LogHelper.log(`Received`, req.body, `Create user ${data}`);

    try {
        const controller = new UserController();
        const response:any = await controller.get(data);
        return res.status(response.code).send(response);

    } catch (errors:any) {
        return {
            error: true,
            code: StatusCodes.INTERNAL_SERVER_ERROR,
            message: errors.errmsg || "Not able to get the queried items",
            errors: errors.errors
        };
    }
});

UserRouter.post('/delete', async (req, res) => {
    let {data} = req.body;
    LogHelper.log(`Received`, req.body, `Delete user ${data}`);

    try {
        const controller = new UserController();
        const response:any = await controller.delete(data);
        return res.status(response.code).send(response);

    } catch (errors:any) {
        return {
            error: true,
            code: StatusCodes.INTERNAL_SERVER_ERROR,
            message: errors.errmsg || "Not able to get the queried items",
            errors: errors.errors
        };
    }

});

export default UserRouter;