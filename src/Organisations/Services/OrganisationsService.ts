import {Service} from "../../Database/DatabaseDomain";
import Organisation from "../Models/Organisation";
import Personne from "../../Personnes/Models/Personne";

class OrganisationsService extends Service
{
    private static _instance:OrganisationsService;

    constructor(entity:Organisation)
    {
        super(entity);
    }

    public static getInstance(model:any):OrganisationsService
    {
        if (OrganisationsService._instance === undefined) {
            OrganisationsService._instance = new OrganisationsService(model);
        }
        return OrganisationsService._instance;
    }
}

export default OrganisationsService;