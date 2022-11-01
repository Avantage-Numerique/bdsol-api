
import {Service} from "../../Database/DatabaseDomain";
import Person from "../Models/Person";

class PersonsService extends Service
{
    /** @private @static Singleton instance */
    private static _instance:PersonsService;

    constructor(entity:Person) {
        super(entity);
    }

    /** @public @static Singleton constructor for PersonsService */
    public static getInstance(model:any):PersonsService {
        if (PersonsService._instance === undefined) {
            PersonsService._instance = new PersonsService(model);
        }
        return PersonsService._instance;
    }
}
export default PersonsService;