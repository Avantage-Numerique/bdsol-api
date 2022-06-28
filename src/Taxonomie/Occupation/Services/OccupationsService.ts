import {Service} from "../../../Database/DatabaseDomain";
import Occupation from "../Models/Occupation";


/**
 * Manage the interaction with the DB for personne. And singleton management in this scope.
 */
class OccupationsService extends Service
{
    private static _instance:OccupationsService;

    constructor(entity:Occupation)
    {
        super(entity);
    }

    public static getInstance(model:any):OccupationsService
    {
        if (OccupationsService._instance === undefined) {
            OccupationsService._instance = new OccupationsService(model);
        }
        return OccupationsService._instance;
    }
}

export default OccupationsService;