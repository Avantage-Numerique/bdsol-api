import { Service } from "@src/Database/DatabaseDomain";
import AutoIncrement from "./AutoIncrement";

class AutoIncrementService extends Service {
    /** @private @static Singleton instance */
    private static _instance: AutoIncrementService;

    constructor(entity: AutoIncrement) {
        super(entity);
    }

    /** @public @static Singleton constructor for PersonsService */
    public static getInstance(model: any): AutoIncrementService {
        if (AutoIncrementService._instance === undefined) {
            AutoIncrementService._instance = new AutoIncrementService(model);
        }
        return AutoIncrementService._instance;
    }
}
export default AutoIncrementService;
