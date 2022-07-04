import {Service} from "../../Database/DatabaseDomain";
import Personne from "../Models/Personne";


/**
 * Manage the interaction with the DB for personne. And singleton management in this scope.
 */
class PersonnesService extends Service
{
    /** @private @static Singleton instance */
    private static _instance:PersonnesService;

    constructor(entity:Personne) {
        super(entity);
    }

    /** @public @static Singleton constructor for PersonnesService */
    public static getInstance(model:any):PersonnesService {
        if (PersonnesService._instance === undefined) {
            PersonnesService._instance = new PersonnesService(model);
        }
        return PersonnesService._instance;
    }
}
export default PersonnesService;