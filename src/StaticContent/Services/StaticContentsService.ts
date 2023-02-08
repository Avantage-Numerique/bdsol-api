import {Service} from "../../Database/DatabaseDomain";
import StaticContent from "../Models/StaticContent";

class StaticContentsService extends Service {
    /** @private @static Singleton instance */
    private static _instance: StaticContentsService;

    constructor(entity: StaticContent) {
        super(entity);
    }

    /** @public @static Singleton constructor for StaticContentsService */
    public static getInstance(model: any): StaticContentsService {
        if (StaticContentsService._instance === undefined) {
            StaticContentsService._instance = new StaticContentsService(model);
        }
        return StaticContentsService._instance;
    }
}

export default StaticContentsService;