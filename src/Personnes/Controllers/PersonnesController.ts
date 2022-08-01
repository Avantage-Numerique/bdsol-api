import Personne from "../Models/Personne"
import PersonnesService from "../Services/PersonnesService";
import AbstractController from "../../Abstract/Controller"

class PersonnesController extends AbstractController {

    /** @private @static Singleton instance */
    private static _instance:AbstractController;

    /** @public PersonnesService */
    service:PersonnesService;

    /** @public Model */
    entity:Personne;

    constructor() {
        super();
        this.entity = Personne.getInstance();
        this.service = new PersonnesService(this.entity);
    }

    /**
     * @public @static @method getInstance Create the singleton instance if not existing 
     * @return {PersonnesController} Controller singleton constructor
    */
    public static getInstance():AbstractController {
        if (PersonnesController._instance === undefined) {
            PersonnesController._instance = new PersonnesController();
        }
        return PersonnesController._instance;
    }
}
export {PersonnesController};