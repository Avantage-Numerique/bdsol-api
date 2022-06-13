import {Service} from "../Database/DatabaseDomain";


abstract class AbstractService extends Service {

    constructor(model:any=null) {
        if (model === null) {
            //il y avait: Personne.getInstance();
            //new Personne().getInstance;
            throw new Error("constructor Personne Service n'as pas de model");
            
        }
        super(model);
    }
}
export default AbstractService;