import {Service} from "@database/DatabaseDomain";
import Communication from "../Models/Communication";

class CommunicationsService extends Service
{
    /** @private @static Singleton instance */
    private static _instance:CommunicationsService;

    constructor(entity:Communication) {
        super(entity);
    }

    /** @public @static Singleton constructor for PersonsService */
    public static getInstance(model:any):CommunicationsService {
        if (CommunicationsService._instance === undefined) {
            CommunicationsService._instance = new CommunicationsService(model);
        }
        return CommunicationsService._instance;
    }
}
export default CommunicationsService;