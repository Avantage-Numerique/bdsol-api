import {Service} from "../../Database/DatabaseDomain";
import Organisation from "../Models/Organisation";

class OrganisationsService extends Service
{
    constructor(entity:Organisation){
        super(entity.schema);
    }
}

export default OrganisationsService;