
import {Service} from "../../Database/DatabaseDomain";
import Organisation from "../Models/Organisation";

class OrganisationsService extends Service {
    //this should received the connection.
    constructor(model:any=null) {
        if (model === null) {
            Organisation.getInstance();
        }
        super(model);
    }
}

export default OrganisationsService;