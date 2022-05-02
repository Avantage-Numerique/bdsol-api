import express from "express";
import PersonneController from "../Controllers/PersonneController";
import LogHelper from "../../Monitoring/Helpers/LogHelper";

const PersonneRouter = express.Router();

/**
 * @method POST/UPDATE Demande la mise à jour des données d'une personne de la base de données.
 * 
 * Paramètre : 
 *      @param {objet} req - req.body contient { data: { { id: }, { "nom":"" (*Champs de création*) } } } }
 *          @desc id (string) - identifiant de la personne à modifier
 * 
 * Retourne :
 *      @return
 */
PersonneRouter.post('/update', async (req, res) => {
    let {data} = req.body;
    LogHelper.log("Update Personne route for ", data);
    const controller = new PersonneController();
    const response = await controller.update(data);
    return res.status(response.code).send(response);
})

/**
 * @method POST/CREATE : Demande la création d'une personne dans la base de données
 * 
 * Paramètre :
 *      @param {objet} req : req.body contient { data: { "nom":"Jean-Marc" (*champs requit à la création d'une personne*) }}
 * 
 * Retourne :
 *      @return 
 */
PersonneRouter.post('/create', async (req, res) => {
    let {data} = req.body;
    LogHelper.log("Create Personne route for ", data);
    const controller = new PersonneController();
    const response:any = await controller.create(data);
    return res.status(response.code).send(response);
});

/**
 * @method POST/SEARCH trouve les personnes correspondant aux critères de recherche
 * 
 * Paramètre :
 *      @param {objet} req : req.body contient {data : { "nom":"Jean-Marc" (*critères de recherche*) }}
 * 
 * Retourne :
 *      @return
 **/
PersonneRouter.post('/search', async (req, res) => {
    let {data} = req.body;
    LogHelper.log("Search Personne route for ", data);
    const controller = new PersonneController();
    const response = await controller.search(data);
    
    return res.status(response.code).send(response);
});

/**
 * @method POST/LIST Retourne la liste des personnes
 * 
 * Paramètre :
 *      @param {objet} req : req.body contient {data : { "nom":"Jean-Marc" (*critères de recherche*) }}
 * 
 * Retourne :
 *      @return
 **/
PersonneRouter.post('/list', async (req, res) => {
    let {data} = req.body;
    LogHelper.log("List Personne route for ", data);
    const controller = new PersonneController();
    const response = await controller.list(data);
    
    return res.status(response.code).send(response);
})

/**
 * @method POST/DELETE trouve une personne dans la liste
 * @todo */
PersonneRouter.post('/delete', async (req, res) => {
    LogHelper.log("Demande de suppression d'une personne");
    LogHelper.log("DELETE not implemented");
    return;

    //const controller = new PersonneController();
    //const response = await controller.delete();
    //return
})

export default PersonneRouter;