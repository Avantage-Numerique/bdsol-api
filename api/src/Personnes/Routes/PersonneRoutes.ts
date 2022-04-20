import express from "express";
import PersonneController from "../Controllers/PersonneController";
import LogHelper from "../../Monitoring/Helpers/LogHelper";
import Personne from "../Models/Personne";
import { LoggerLevel } from "mongoose/node_modules/mongodb";

const PersonneRouter = express.Router();


//POST UPDATE une personne
PersonneRouter.post('/update', async (req, res) => {
    let {data} = req.body;
    LogHelper.log(`Update Personne route for ${data.id}`);
    const controller = new PersonneController();
    const response = await controller.update(data.id, data.updatedValues);
    //return
})

//POST CREATE new personne
PersonneRouter.post('/create', async (req, res) => {
    LogHelper.log(req.body);
    LogHelper.log(req);
    let {nom, prenom, surnom, description} = req.body;
    LogHelper.log(nom, prenom, surnom, description);
    let {data} = req.body;
    LogHelper.log(`Create Personne route for ${data}`);
    const controller = new PersonneController();
    const response:any = await controller.create(data);
    return res.status(response.code).send(response);
});


//POST FIND une personne dans la liste
PersonneRouter.post('/find', async (req, res) => {
    LogHelper.log("Demande de recherche dans la liste de personnes");
    LogHelper.log("FIND not implemented");
    return;

    const controller = new PersonneController();
    const response = await controller.find();
    //return
});

//POST READ/LIST des personnes
PersonneRouter.post('/list', async (req, res) => {
    LogHelper.log("Demande d'accès à la liste de personnes");
    LogHelper.log("READ/LIST not implemented");
    return;

    const controller = new PersonneController();
    const response = await controller.list();
    //return
})


//POST-->Delete http? Delete une personne
PersonneRouter.delete('/delete', async (req, res) => {
    LogHelper.log("Demande de suppression d'une personne");
    LogHelper.log("DELETE not implemented");
    return;

    const controller = new PersonneController();
    const response = await controller.delete();
    //return
})


export default PersonneRouter;