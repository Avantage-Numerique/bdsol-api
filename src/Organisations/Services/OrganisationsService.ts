import {Service} from "../../Database/DatabaseDomain";
import Organisation from "../Models/Organisation";

class OrganisationsService extends Service
{

    /** @private @static Singleton instance */
    private static _instance:OrganisationsService;

    constructor(entity:Organisation) {
        super(entity);
    }

    /** @public @static Singleton constructor for OrganisationsService */
    public static getInstance(model:any):OrganisationsService {
        if (OrganisationsService._instance === undefined) {
            OrganisationsService._instance = new OrganisationsService(model);
        }
        return OrganisationsService._instance;
    }
}
export default OrganisationsService;