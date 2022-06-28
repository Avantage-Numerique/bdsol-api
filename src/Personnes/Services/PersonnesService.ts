import {Service} from "../../Database/DatabaseDomain";
import Personne from "../Models/Personne";

class PersonnesService extends Service
{
    constructor(entity:Personne){
        super(entity.schema);
    }
}

export default PersonnesService;