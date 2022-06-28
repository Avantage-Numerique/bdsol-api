import {Service} from "../../../Database/DatabaseDomain";
import Occupation from "../Models/Occupation";

class OccupationsService extends Service
{

    constructor(entity:Occupation)
    {
        super(entity.schema);
    }
}

export default OccupationsService;