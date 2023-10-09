import AbstractController from "@core/Controller";
import EquipmentService from "@src/Equipment/Services/EquipmentService";
import Equipment from "@src/Equipment/Models/Equipment";

class EquipmentController extends AbstractController {

    /** @private @static Singleton instance */
    private static _instance: AbstractController;

    /** @public PersonsService */
    service: EquipmentService;

    /** @public Model */
    entity: Equipment;

    name: string = "Equipment";

    constructor() {
        super();
        this.entity = Equipment.getInstance();
        this.service = EquipmentService.getInstance(this.entity);
    }

    /**
     * @public @static @method getInstance Create the singleton instance if not existing
     * @return {EquipmentController} Controller singleton constructor
     */
    public static getInstance(): AbstractController {
        if (typeof EquipmentController._instance === "undefined") {
            EquipmentController._instance = new EquipmentController();
        }
        return EquipmentController._instance;
    }
}

export default EquipmentController;