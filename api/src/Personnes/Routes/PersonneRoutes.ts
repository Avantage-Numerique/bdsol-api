import express from "express";
import PersonneController from "../Controllers/PersonneController";
import LogHelper from "../../Monitoring/Helpers/LogHelper";

const PersonneRouter = express.Router();



//POST Create new personne
PersonneRouter.post('/create', (req, res) => {
    LogHelper.log("Demande de création d'une Personne");

    //let PersonneSchema personne = new PersonneSchema()??
    

    const controller = new PersonneController();
    const response = await controller.create();
    return res.status(response).send(response);
});

//POST Find une personne
PersonneRouter.post('/find', (req, res) => {

});

//POST Read/List les personne
PersonneRouter.get('/find')

//POST UPDATE une personne

//POST-->Delete http? Delete une personne

export default PersonneRouter;