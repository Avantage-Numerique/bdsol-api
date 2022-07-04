import {Service} from "../../Database/DatabaseDomain";
import Taxonomy from "../Models/Taxonomy";

class TaxonomyService extends Service
{
    /** @private @static Singleton instance */
    private static _instance:TaxonomyService;

    constructor(entity:Taxonomy) {
        super(entity);
    }

    /** @public @static Singleton constructor for TaxonomyService */
    public static getInstance(model:any):TaxonomyService {
        if (TaxonomyService._instance === undefined) {
            TaxonomyService._instance = new TaxonomyService(model);
        }
        return TaxonomyService._instance;
    }
}
export default TaxonomyService;