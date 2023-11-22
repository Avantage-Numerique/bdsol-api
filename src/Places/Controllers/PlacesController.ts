import AbstractController from "@core/Controller";
import PlacesService from "@src/Places/Services/PlacesService";
import Place from "@src/Places/Models/Place";

class PlacesController extends AbstractController {

    /** @private @static Singleton instance */
    private static _instance: AbstractController;

    /** @public PersonsService */
    service: PlacesService;

    /** @public Model */
    entity: Place;

    name: string = "Place";

    constructor() {
        super();
        this.entity = Place.getInstance();
        this.service = PlacesService.getInstance(this.entity);
    }

    /**
     * @public @static @method getInstance Create the singleton instance if not existing
     * @return {PlacesController} Controller singleton constructor
     */
    public static getInstance(): AbstractController {
        if (typeof PlacesController._instance === "undefined") {
            PlacesController._instance = new PlacesController();
        }
        return PlacesController._instance;
    }
}

export default PlacesController;