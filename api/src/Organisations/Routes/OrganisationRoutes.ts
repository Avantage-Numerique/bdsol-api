import express from "express";
import OrganisationController from "../Controllers/OrganisationController"
import LogHelper from "../../Monitoring/Helpers/LogHelper";

const OrganisationRouter = express.Router();

/**
 * @method POST/UPDATE Demande la mise à jour des données d'une organisation
 * 
 * Paramètre :
 *      @param {objet} req -
 * 
 * Retourne :
 *      @return
 */
OrganisationRouter.post('/update', async (req, res) => {
    LogHelper.debug("OrganisationRouter.post/update");
    let {data} = req.body;
    const controller = new OrganisationController();
    const response = await controller.update(data);
    return;
})

/**
 * @method POST/CREATE : Demande la création d'une personne dans la base de données
 * 
 * Paramètre :
 *      @param {objet} req : req.body contient { data: { *champs requit à la création d'une personne* }}
 * 
 * Retourne :
 *      @return 
 */
 OrganisationRouter.post('/create', async (req, res) => {
    LogHelper.debug("OrganisationRouter.post/create");
    let {data} = req.body;
    const controller = new OrganisationController();
    const response = await controller.create(data);
    return;
})

export default OrganisationRouter;