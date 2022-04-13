import LogHelper from "../../Monitoring/Helpers/LogHelper";
import ServerController from "../../Server/Controllers/ServerController";
import PersonneService from "../Services/PersonneService";

class PersonneController {

    public async create():Promise<string> {
        LogHelper.log("Début de création d'une personne");
        LogHelper.log("Réussite de la création d'une personne");
        return "Bidon";
    }

}

export default PersonneController;