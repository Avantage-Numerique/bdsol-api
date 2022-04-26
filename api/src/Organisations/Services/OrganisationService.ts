
import Service from "../../Database/Service";
import Organisation from "../Models/Organisation";

class OrganisationService extends Service {
    //this should received the connection.
    constructor(model:any=null) {
        if (model === null) {
            Organisation.getInstance();
        }
        super(model);
    }
}

export default OrganisationService;