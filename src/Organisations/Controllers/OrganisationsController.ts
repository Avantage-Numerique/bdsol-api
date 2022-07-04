import Organisation from "../Models/Organisation"
import OrganisationsService from "../Services/OrganisationsService";
import AbstractController from "../../Abstract/Controller"

class OrganisationsController extends AbstractController {

    /** @private @static Singleton instance */
    private static _instance:AbstractController;

    /** @public OrganisationService */
    service:OrganisationsService;

    /** @public Model */
    entity:Organisation;

    constructor() {
        super();
        this.entity = Organisation.getInstance();
        this.service = new OrganisationsService(this.entity);
    }

    /**
     * @public @static @method getInstance Create the singleton instance if not existing 
     * @return {OrganisationsController} Controller singleton constructor
    */
    public static getInstance():AbstractController {
        if (OrganisationsController._instance === undefined) {
            OrganisationsController._instance = new OrganisationsController();
        }
        return OrganisationsController._instance;
    }
}
export default OrganisationsController;