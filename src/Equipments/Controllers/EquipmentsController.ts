import AbstractController from "@core/Controller";
import EquipmentsService from "@src/Equipments/Services/EquipmentsService";
import Equipment from "@src/Equipments/Models/Equipment";

class EquipmentsController extends AbstractController {

    /** @private @static Singleton instance */
    private static _instance: AbstractController;

    /** @public PersonsService */
    service: EquipmentsService;

    /** @public Model */
    entity: Equipment;

    name: string = "Equipment";

    constructor() {
        super();
        this.entity = Equipment.getInstance();
        this.service = EquipmentsService.getInstance(this.entity);
    }

    /**
     * @public @static @method getInstance Create the singleton instance if not existing
     * @return {EquipmentsController} Controller singleton constructor
     */
    public static getInstance(): AbstractController {
        if (typeof EquipmentsController._instance === "undefined") {
            EquipmentsController._instance = new EquipmentsController();
        }
        return EquipmentsController._instance;
    }
}

export default EquipmentsController;