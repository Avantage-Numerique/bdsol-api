import {Service} from "@database/DatabaseDomain";
import Taxonomy from "../Models/Taxonomy";
import LogHelper from "@src/Monitoring/Helpers/LogHelper";

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
            document.meta = {
                ...document.meta,
                count: currentCount
            }
            await document.save();
            LogHelper.info(`[Embedding] Taxonomy entities count ${currentCount} assign with ${document.name} taxonomy`);

        } catch(e:any) {
            throw new Error(e);
        }
    }
}
export default TaxonomyService;