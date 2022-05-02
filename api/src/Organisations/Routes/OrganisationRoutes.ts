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
    let {data} = req.body;
    LogHelper.log("Update Organisations route for ", data);
    const controller = new OrganisationController();
    const response = await controller.update(data);
    return res.status(response.code).send(response);
});



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
     let {data} = req.body;
     LogHelper.log("Create Personne route for ", data);
    const controller = new OrganisationController();
    const response = await controller.create(data);
    return res.status(response.code).send(response);
});

export default OrganisationRouter;