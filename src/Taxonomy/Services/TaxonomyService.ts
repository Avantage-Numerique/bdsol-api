import {Service} from "@database/DatabaseDomain";
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

    public async embedCount(document:any, results:Array<any>) {
        try {
            const currentCount:Number = results.length;
            document.meta.statistics.count = currentCount
            await document.save();
        } catch(e:any) {
            throw new Error(e);
        }
    }
}
export default TaxonomyService;