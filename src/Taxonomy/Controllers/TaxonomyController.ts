import Taxonomy from "../Models/Taxonomy"
import TaxonomyService from "../Services/TaxonomyService";
import AbstractController from "../../Abstract/Controller"

class TaxonomyController extends AbstractController {

    /** @private @static Singleton instance */
    private static _instance:AbstractController;

    /** @public TaxonomyService */
    service:TaxonomyService;

    /** @public Model */
    entity:Taxonomy;

    name:string = "Taxonomy";

    constructor() {
        super();
        this.entity = Taxonomy.getInstance();
        this.service = new TaxonomyService(this.entity);
    }

    /**
     * @public @static @method getInstance Create the singleton instance if not existing 
     * @return {TaxonomyController} Controller singleton constructor
    */
    public static getInstance():AbstractController {
        if (TaxonomyController._instance === undefined) {
            TaxonomyController._instance = new TaxonomyController();
        }
        return TaxonomyController._instance;
    }
}
export {TaxonomyController};