import Taxonomy from "../Models/Taxonomy"
import TaxonomyService from "../Services/TaxonomyService";
import AbstractController from "../../Abstract/Controller"
import {ReasonPhrases, StatusCodes} from "http-status-codes";
import {SuccessResponse} from "../../Http/Responses/SuccessResponse";
import {TaxonomiesCategories} from "../TaxonomiesEnum";

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
        this.service = TaxonomyService.getInstance(this.entity);
        //this.service = new TaxonomyService(this.entity);
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

    public static getTaxonomies():any {
        const data:any = {
            taxonomies: TaxonomiesCategories
        }
        return SuccessResponse.create(data, StatusCodes.OK, ReasonPhrases.OK);
    }
}
export {TaxonomyController};