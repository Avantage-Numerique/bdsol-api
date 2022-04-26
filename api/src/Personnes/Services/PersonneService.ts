import Service from "../../Database/Service";
import Personne from "../Models/Personne";

class PersonneService extends Service {
    constructor(model:any=null) {
        if (model === null) {
            Personne.getInstance();
        }
        super(model);
    }
}

export default PersonneService;