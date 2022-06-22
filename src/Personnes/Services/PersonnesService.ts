import {Service} from "../../Database/DatabaseDomain";
import Personne from "../Models/Personne";

class PersonnesService extends Service
{

    constructor(entity:Personne)
    {
        super(entity.schema);
        //let model;
        //if (mongoose.models[entity.modelName]=== undefined){
            //model = entity.getInstance();
            //super(model);
        //}
        //else
            //super(mongoose.models[entity.modelName]);
    }
}

export default PersonnesService;