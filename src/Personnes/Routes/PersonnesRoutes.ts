import express from "express";
import {PersonnesController} from "../Controllers/PersonnesController";
import LogHelper from "../../Monitoring/Helpers/LogHelper";

const PersonnesRouter = express.Router();

/**
 * @method POST/UPDATE Demande la mise à jour des données d'une personne de la base de données.
 * 
 * Paramètre : 
 *      @param {object} req - req.body contient { data: { { id: }, { "nom":"" (*Champs de création*) } } } }
 *          @desc id (string) - identifiant de la personne à modifier
 * 
 * Retourne :
 *      @return
 */
PersonnesRouter.post('/update', async (req, res) => {
    const {data} = req.body;
    LogHelper.log("Update Personne route for ", data);
    const controller = new PersonnesController();
    const response = await controller.update(data);
    return res.status(response.code).send(response);
});

/**
 * @method POST/CREATE : Demande la création d'une personne dans la base de données
 * 
 * Paramètre :
 *      @param {object} req : req.body contient { data: { "nom":"Jean-Marc" (*champs requit à la création d'une personne*) }}
 * 
 * Retourne :
 *      @return 
 */
PersonnesRouter.post('/create', async (req, res) => {
    const {data} = req.body;
    LogHelper.log("Create Personne route for ", data);
    const controller = new PersonnesController();
    const response:any = await controller.create(data);
    return res.status(response.code).send(response);
});

/**
 * @method POST/SEARCH trouve les personnes correspondant aux critères de recherche
 * 
 * Paramètre :
 *      @param {object} req : req.body contient {data : { "nom":"Jean-Marc" (*critères de recherche*) }}
 * 
 * Retourne :
 *      @return
 **/
PersonnesRouter.post('/search', async (req, res) => {
    const {data} = req.body;
    LogHelper.log("Search Personne route for ", data);
    const controller = new PersonnesController();
    const response = await controller.search(data);
    
    return res.status(response.code).send(response);
});

/**
 * @method POST/LIST Retourne la liste des personnes
 * 
 * Paramètre :
 *      @param {object} req : req.body contient {data : { "nom":"Jean-Marc" (*critères de recherche*) }}
 * 
 * Retourne :
 *      @return
 **/
PersonnesRouter.post('/list', async (req, res) => {
    const {data} = req.body;
    LogHelper.log("List Personne route for ", data);
    const controller = new PersonnesController();
    const response = await controller.list(data);
    
    return res.status(response.code).send(response);
});

/**
 * @method POST/DELETE trouve une personne dans la liste
 * @todo */
 PersonnesRouter.post('/delete', async (req, res) => {
    const {data} = req.body;
    LogHelper.log("Delete Personne route for ", data);
    const controller = new PersonnesController();
    const response:any = await controller.delete(data);
    return res.status(response.code).send(response);
});


/**
 * @method POST/FIELDINFO Retourne les règles et information des champs des attributs de personne
 * 
 * Paramètre :
 *      @param {object} req : req.body contient {data : { "method":"Create" }}
 * 
 * Retourne :
 *      @return
 **/
 PersonnesRouter.post('/getinfo', async (req, res) => {
    const {data} = req.body;
    LogHelper.log("Demande d'envoi des informations de field", data);
    const controller = new PersonnesController();
    const response = await controller.getInfo(data);
    
    return res.status(response.code).send(response);
});

export {PersonnesRouter};