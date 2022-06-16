import express from "express";
import {PersonnesController} from "../Controllers/PersonnesController";

const PersonnesRouter = express.Router();
const controller = new PersonnesController();

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

PersonnesRouter.post('/create', controller.create);
PersonnesRouter.post('/update', controller.update);
PersonnesRouter.post('/search', controller.search);
PersonnesRouter.post('/list', controller.list);
PersonnesRouter.post('/delete', controller.delete);
PersonnesRouter.post('/getinfo', controller.getInfo);


export {PersonnesRouter};