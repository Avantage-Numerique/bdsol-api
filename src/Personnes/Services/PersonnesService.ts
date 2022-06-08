import {Service} from "../../Database/DatabaseDomain";
import Personne from "../Models/Personne";

class PersonnesService extends Service {
    constructor(model:any=null) {
        if (model === null) {
            //il y avait: Personne.getInstance();
            //new Personne().getInstance;
            throw new Error("constructor Personne Service n'as pas de model");
            
        }
        super(model);
    }
}

export default PersonnesService;