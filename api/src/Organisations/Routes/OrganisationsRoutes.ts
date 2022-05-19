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


export {OrganisationsRouter};