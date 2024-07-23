import {Service} from "@database/DatabaseDomain";
import Equipment from "@src/Equipment/Models/Equipment";

class EquipmentService extends Service {
    /** @private @static Singleton instance */
    private static _instance: EquipmentService;

    constructor(entity: Equipment) {
        super(entity);
    }

    /** @public @static Singleton constructor for EquipmentsService */
    public static getInstance(model: any): EquipmentService {
        if (typeof EquipmentService._instance === "undefined") {
            EquipmentService._instance = new EquipmentService(model);
        }
        return EquipmentService._instance;
    }
}

export default EquipmentService;