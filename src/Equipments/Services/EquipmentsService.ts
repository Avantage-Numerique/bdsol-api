import {Service} from "@database/DatabaseDomain";
import Equipment from "@src/Equipments/Models/Equipment";

class EquipmentsService extends Service {
    /** @private @static Singleton instance */
    private static _instance: EquipmentsService;

    constructor(entity: Equipment) {
        super(entity);
    }

    /** @public @static Singleton constructor for EquipmentsService */
    public static getInstance(model: any): EquipmentsService {
        if (typeof EquipmentsService._instance === "undefined") {
            EquipmentsService._instance = new EquipmentsService(model);
        }
        return EquipmentsService._instance;
    }
}

export default EquipmentsService;