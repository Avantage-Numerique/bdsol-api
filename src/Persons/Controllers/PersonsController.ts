import Person from "../Models/Person"
import PersonsService from "../Services/PersonsService";
import AbstractController from "../../Abstract/Controller"

class PersonsController extends AbstractController {

    /** @private @static Singleton instance */
    private static _instance:AbstractController;

    /** @public PersonsService */
    service:PersonsService;

    /** @public Model */
    entity:Person;

    constructor() {
        super();
        this.entity = Person.getInstance();
        this.service = PersonsService.getInstance(this.entity);
    }

    /**
     * @public @static @method getInstance Create the singleton instance if not existing 
     * @return {PersonsController} Controller singleton constructor
    */
    public static getInstance():AbstractController {
        if (PersonsController._instance === undefined) {
            PersonsController._instance = new PersonsController();
        }
        return PersonsController._instance;
    }
}
export default PersonsController;