import express from "express";
import PersonneController from "../Controllers/PersonneController";
import LogHelper from "../../Monitoring/Helpers/LogHelper";
import Personne from "../Models/Personne";

const PersonneRouter = express.Router();

//Route TestLog
PersonneRouter.post('/log', async (req,res) => {
    LogHelper.log("Entrée dans /log");

    LogHelper.log("1 - Test Log");
    LogHelper.log("Log");
    
    LogHelper.error("2 - Test Error");
    LogHelper.error("Error");
    
    LogHelper.warn("3 - Test Warn");
    LogHelper.warn("Warn");
    
    LogHelper.info("4 - Test Info");
    LogHelper.info("Info");

    LogHelper.debug("5 - Test Debug");
    LogHelper.debug("Debug");
    return res.status(200).send(); 
})

//POST CREATE new personne
PersonneRouter.post('/create', async (req, res) => {
    LogHelper.log("Demande de création d'une personne");
    
    let {nom, prenom, surnom, description} = req.body;
    const pers:Personne = new Personne(nom, prenom, surnom, description);

    const controller = new PersonneController();
    const response = await controller.create(pers);
    return res.status(200).send(response);
});

//POST UPDATE une personne
PersonneRouter.post('/update', async (req, res) => {
    LogHelper.log("Demande d'update des données d'une personne");


    //Création de la personne update
    let {id, nom, prenom, surnom, description} = req.body;
    const pers:Personne = new Personne(nom, prenom, surnom, description);

    const controller = new PersonneController();
    const response = await controller.update(id, pers);
    //return
})

//POST FIND une personne dans la liste
PersonneRouter.post('/find', async (req, res) => {
    LogHelper.log("Demande de recherche dans la liste de personnes");
});

//POST READ/LIST des personnes
PersonneRouter.post('/list', async (req, res) => {
    LogHelper.log("Demande d'accès à la liste de personnes");

    const controller = new PersonneController();
    const response = await controller.list();
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