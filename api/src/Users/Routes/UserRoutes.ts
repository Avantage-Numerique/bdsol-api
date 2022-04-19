import express from "express";
import UserController from "../Controllers/UserController";
import LogHelper from "../../Monitoring/Helpers/LogHelper";
import {StatusCodes} from "http-status-codes";

// add { mergeParams: true } to get the main route params.
const UserRouter = express.Router();

//  CRUD

// USER/UPDATE
UserRouter.post('/update', async (req, res) => {
    let {user} = req.body;
    LogHelper.log(`Update request on users route with this date : ${user}`);
    try {
        LogHelper.log(`Update user id : ${user.id}`);
        const controller = new UserController();
        const response:any = await controller.update(user.id, user.updatedValues);
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

// USERS/CREATE
UserRouter.post('/create', async (req, res) => {
    let {data} = req.body;
    LogHelper.log(`Received`, req.body, `Create user ${data}`);
    const controller = new UserController();
    const response:any = await controller.create(data);
    return res.status(response.code).send(response);
});

export default UserRouter;