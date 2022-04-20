import LogHelper from "../../Monitoring/Helpers/LogHelper";
import Personne from "../Models/Personne"
//import { PersonneSchema } from "../Schemas/PersonneSchema";
import mongoose from "mongoose";
import PersonneService from "../Services/PersonneService";

class PersonneController {

    // Service attribute + constructeur userservice user. getinstance()
    public service:PersonneService;

    constructor(){
        this.service = new PersonneService(Personne.getInstance());
    }

    public async create(pers:Personne):Promise<void> {
        LogHelper.log("Début de création d'une personne avec les paramètre suivants: " + pers.AttributsPersonneToString());

        try {
            let createdDocumentResponse = await this.service.insert(pers);
            if(createdDocumentResponse != undefined) LogHelper.error("createdDocumentResponse : " + createdDocumentResponse.message, createdDocumentResponse.code, createdDocumentResponse.error)
            LogHelper.log("Réussite de la création d'une personne");
        }
        catch(e) {
            LogHelper.error("Échec de la création d'une personne", e);
        }

        //Demande à la BD la création/vérification de la personne

        //Si all good, add new personne => return all good
        /*try{
            //const personneService:PersonneService = new PersonneService(Personne.modelName);
            //personneService.insert("allo");
            const personne = mongoose.model(Personne.modelName,Personne.schema);
            const p = new personne();
            p._id = new mongoose.Types.ObjectId();
            p.nom = pers.nom;
            p.prenom = pers.prenom;
            p.surnom = pers.surnom;
            p.description = pers.description;
            p.markModified(p.nom);
            await p.save();
            */
            //Si all good
            //LogHelper.log("Réussite de la création d'une personne");
        //}
        /*catch(e){
            //Sinon (Went wrong => return went wrong)
            LogHelper.error("Échec de la création d'une personne", e);
        }*/

        return;
    }

    
    public async update(id:string, pers:Personne):Promise<void> {
        LogHelper.log("Début de la tentative d'update les données d'une personne");

        try{
            //Demande à la BD l'objet personne à modifier
            let updateDocumentResponse = await this.service.update(id, pers);

            //Si all good, send modif => return all good
            if (updateDocumentResponse.error == false && updateDocumentResponse.message == "Mise à jour de l'item réussi")
            LogHelper.warn(updateDocumentResponse.message);

        }
        catch(e){
            //Sinon (went wrong => return went wrong)
            LogHelper.log("Échec de l'update des données d'une personne");
            return;
        }
        LogHelper.log("Réussite de l'update des données d'une personne");
        return;
    }

    public async list():Promise<void> {
        LogHelper.log("Début de la requête d'obtention de la liste de personne");
        LogHelper.log("Réussite de la requête d'obtention de la liste");
        LogHelper.log("Échec de la requête d'obtention de la liste");
        return;
    }

    public async find():Promise<void> {
        LogHelper.log("Début de la recherche dans la liste");
        LogHelper.log("X résultat trouvé");
        LogHelper.log("Aucun résultat trouvé");
        LogHelper.log("Échec de la recherche. Cause : ______");
        return;
    }

    public async delete():Promise<void> {
        LogHelper.log("Début de la suppression d'une personne");
        LogHelper.log("Réussite de la suppression d'une personne");
        LogHelper.log("Échec de la suppression d'une personne");
        return;
    }

}

export default PersonneController;