import {Service} from "@database/DatabaseDomain";
import Place from "@src/Places/Models/Place";

class PlacesService extends Service {
    /** @private @static Singleton instance */
    private static _instance: PlacesService;

    constructor(entity: Place) {
        super(entity);
    }

    /** @public @static Singleton constructor for PlacesService */
    public static getInstance(model: any): PlacesService {
        if (typeof PlacesService._instance === "undefined") {
            PlacesService._instance = new PlacesService(model);
        }
        return PlacesService._instance;
    }
}

export default PlacesService;