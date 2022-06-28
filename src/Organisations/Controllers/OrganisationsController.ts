import Organisation from "../Models/Organisation"
import OrganisationsService from "../Services/OrganisationsService";
import AbstractController from "../../Abstract/Controller"

class OrganisationsController extends AbstractController {

    private static _instance:AbstractController;
    /** @public OrganisationService */
    public service:OrganisationsService;
    entity:Organisation;

    constructor()
    {
        super();
        this.entity = new Organisation();
        this.service = new OrganisationsService(this.entity);
    }

    public static getInstance():AbstractController
    {
        if (OrganisationsController._instance === undefined) {
            OrganisationsController._instance = new OrganisationsController();
        }
        return OrganisationsController._instance;
    }

}

export default OrganisationsController;