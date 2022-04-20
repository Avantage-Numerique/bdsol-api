import express from "express";
import UserController from "../Controllers/UserController";
import LogHelper from "../../Monitoring/Helpers/LogHelper";

// add { mergeParams: true } to get the main route params.
const UserRouter = express.Router();

//  CRUD

// USER/UPDATE
UserRouter.post('/update', async (req, res) => {
    let {data} = req.body;
    LogHelper.log(`Update user route for ${data.id}`);
    const controller = new UserController();
    const response:any = await controller.update(data.id, data.updatedValues);
    return res.status(response.code).send(response);
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