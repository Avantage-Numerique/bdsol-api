import LogHelper from "../../Monitoring/Helpers/LogHelper";
import ServerController from "../../Server/Controllers/ServerController";
import PersonneService from "../Services/PersonneService";

class PersonneController {

    public async create(nom:string, prenom:string, surnom:string):Promise<void> {
        LogHelper.log(`Début de création d'une personne avec les paramètre suivants: nom=${nom}, prenom=${prenom}, surnom=${surnom}`);
        LogHelper.log("Réussite de la création d'une personne");
        LogHelper.error("Échec de la création d'une personne");
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

    public async update():Promise<void> {
        LogHelper.log("Début de la tentative d'update les données d'une personne");
        LogHelper.log("Réussite de l'update des données d'une personne");
        LogHelper.log("Échec de l'update des données d'une personne");
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