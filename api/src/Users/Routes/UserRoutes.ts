import express from "express";
import UserController from "../Controllers/UserController";
import LogHelper from "../../Monitoring/Helpers/LogHelper";

// add { mergeParams: true } to get the main route params.
const UserRouter = express.Router();

//  CRUD

// USER/UPDATE
UserRouter.post('/update', async (req, res) => {
    let {id, data} = req.body;
    LogHelper.log(`update user route for ${id}`)
    const controller = new UserController();
    const response = await controller.update(id, data);
    return res.status(response.code).send(response);
});

export default UserRouter;