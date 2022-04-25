import express from "express";
import PersonneController from "../Controllers/PersonneController";
import LogHelper from "../../Monitoring/Helpers/LogHelper";
import Personne from "../Models/Personne";
import { LoggerLevel } from "mongoose/node_modules/mongodb";

const PersonneRouter = express.Router();

/**POST UPDATE : Demande la mise à jour des données d'une personne de la base de données.
 * Paramètre : 
 *      @req : req.body contient { data: { { id: }, { updatedValues: } } }
 * 
 * Retourne :
 */
PersonneRouter.post('/update', async (req, res) => {
    let {data} = req.body;
    try{
    LogHelper.log(`Update Personne route for ${data.id}`);
    }
    catch(e){
        LogHelper.error("Update échouée");
        LogHelper.debug("id manquant? req.body :", req.body);
        return;//Retourner un status?
    }
    const controller = new PersonneController();
    const response = await controller.update(data.id, data.updatedValues);
    return res.status(response.code).send(response);
})

/**POST CREATE : Demande la création d'une personne dans la base de données
 * Paramètre :
 *      @req : req.body contient { data: { *champs requit à la création d'une personne* }}
 * 
 * Retourne : 
 */
PersonneRouter.post('/create', async (req, res) => {
    let {data} = req.body;
    LogHelper.log("Create Personne route for ", data);
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