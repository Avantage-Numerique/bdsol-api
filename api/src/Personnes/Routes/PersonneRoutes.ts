import express from "express";
import PersonneController from "../Controllers/PersonneController";
import LogHelper from "../../Monitoring/Helpers/LogHelper";

const PersonneRouter = express.Router();



//POST Create new personne
PersonneRouter.post('/create', async (req, res) => {
    LogHelper.log("Demande de création d'une personne");

    let {nom, prenom, surnom} = req.body;
    
    const controller = new PersonneController();
    const response = await controller.create(nom, prenom, surnom);
    return res.status(200).send(response);
});

//POST Find une personne dans la liste
PersonneRouter.post('/find', async (req, res) => {
    LogHelper.log("Demande de recherche dans la liste de personnes");
});

//POST Read/List des personnes
PersonneRouter.post('/list', async (req, res) => {
    LogHelper.log("Demande d'accès à la liste de personnes");

    const controller = new PersonneController();
    const response = await controller.list();
    //return
})

//POST UPDATE une personne
PersonneRouter.post('/update', async (req, res) => {
    LogHelper.log("Demande d'update des données d'une personne");

    const controller = new PersonneController();
    const response = await controller.update();
    //return
})

//POST-->Delete http? Delete une personne
PersonneRouter.delete('/delete', async (req, res) => {
    LogHelper.log("Demande de suppression d'une personne");

    const controller = new PersonneController();
    const response = await controller.delete();
    //return
})


export default PersonneRouter;