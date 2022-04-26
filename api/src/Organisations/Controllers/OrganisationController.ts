import LogHelper from "../../Monitoring/Helpers/LogHelper";
import Organisation from "../Models/Organisation"
import ServiceResponse from "../../Database/Responses/ServiceResponse";
import OrganisationService from "../Services/OrganisationService";
import {StatusCodes} from "http-status-codes";
import {OrganisationSchema} from "../Schemas/OrganisationSchema";


class OrganisationController {

    /** @public OrganisationService */
    public service:OrganisationService;

    /** @constructor */
    constructor() {
        this.service = new OrganisationService(Organisation.getInstance());
    }

    /**
     * @method update permet de modifier et mettre à jour les attributs d'une organisation dans la base de donnée.
     * @todo
     * Paramètres :
     *      @param {liste} requestData -
     * 
     * Retourne :
     *      @return {ServiceResponse}
     */
    public async update(requestData:any):Promise<void> {//Promise<ServiceResponse>
        LogHelper.debug("OrganisationController.update()");
        return;
    }


    /**
     * @method create permet de créer et d'insérer une nouvelle entité "Organisation" dans la base de données
     * @todo
     * Paramètres :
     *      @param {liste} requestData -
     * 
     * Retourne :
     *      @return {ServiceResponse}
     */
    public async create(requestData:any):Promise<void> {//Promise<ServiceResponse>
        LogHelper.debug("OrganisationController.create()");
        return;
    }

}

export default OrganisationController;