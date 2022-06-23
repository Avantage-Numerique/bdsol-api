import express from "express";
import {PersonnesController} from "../Controllers/PersonnesController";
import AbstractRoute from "../../Abstract/Route";
import AbstractController from "../../Abstract/Controller";

class PersonnesRoutes extends AbstractRoute {
    controllerInstance: AbstractController = PersonnesController.getInstance();
    routerInstance: express.Router = express.Router();
}

//const personneController = PersonnesController.getInstance();
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
//PersonnesRouter.post('/update', async (req, res) => {
    //const {data} = req.body;
    //LogHelper.log("Update Personne route for ", data);
    //const controller = new PersonnesController();
    //const response = await controller.update(data);
    //return res.status(response.code).send(response); //Ceci doit être retourné par la f(x) du controller.
//});

export {PersonnesRoutes};