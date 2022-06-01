import express from "express";
import OrganisationsController from "../Controllers/OrganisationsController"
import LogHelper from "../../Monitoring/Helpers/LogHelper";

const OrganisationsRouter = express.Router();

/**
 * @method POST/UPDATE Demande la mise à jour des données d'une organisation
 * 
 * Paramètre :
 *      @param {object} req -
 * 
 * Retourne :
 *      @return
 */
OrganisationsRouter.post('/update', async (req, res) => {
    const {data} = req.body;
    LogHelper.log("Update Organisations route for ", data);
    const controller = new OrganisationsController();
    const response = await controller.update(data);
    return res.status(response.code).send(response);
});


/**
 * @method POST/CREATE : Demande la création d'une personne dans la base de données
 * 
 * Paramètre :
 *      @param {object} req : req.body contient { data: { *champs requit à la création d'une personne* }}
 * 
 * Retourne :
 *      @return 
 */
 OrganisationsRouter.post('/create', async (req, res) => {
     const {data} = req.body;
     LogHelper.log("Create Organisations route for ", data);
    const controller = new OrganisationsController();
    const response = await controller.create(data);
    return res.status(response.code).send(response);
});


/**
 * @method POST/SEARCH trouve la première organisation correspondant aux critères de recherche
 * 
 * Paramètre :
 *      @param {object} req : req.body contient {data : { "nom":"Jean-Marc" (*critères de recherche*) }}
 * 
 * Retourne :
 *      @return
 **/
 OrganisationsRouter.post('/search', async (req, res) => {
    const {data} = req.body;
    LogHelper.log("Search Organisation route for ", data);
    const controller = new OrganisationsController();
    const response = await controller.search(data);
    
    return res.status(response.code).send(response);
});


/**
 * @method POST/LIST Retourne la liste des organisations
 * 
 * Paramètre :
 *      @param {object} req : req.body contient {data : { "nom":"Petit théâtre" (*critères de recherche*) }}
 * 
 * Retourne :
 *      @return
 **/
 OrganisationsRouter.post('/list', async (req, res) => {
    const {data} = req.body;
    LogHelper.log("List Organisation route for ", data);
    const controller = new OrganisationsController();
    const response = await controller.list(data);
    
    return res.status(response.code).send(response);
});

/**
 * @method POST/DELETE trouve une organisation dans la liste selon le id
 * @param {object} req : req.body contient data { id } de la personne à supprimer.
 */
 OrganisationsRouter.post('/delete', async (req, res) => {
    const {data} = req.body;
    LogHelper.log("Delete Organisation route for ", data);
    const controller = new OrganisationsController();
    const response:any = await controller.delete(data);
    return res.status(response.code).send(response);
});

export {OrganisationsRouter};