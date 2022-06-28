import {Service} from "../../Database/DatabaseDomain";
import Personne from "../Models/Personne";


class PersonnesService extends Service
{
    private static _instance:PersonnesService;

    constructor(entity:Personne)
    {
        super(entity);
    }

    public static getInstance(model:any):PersonnesService
    {
        if (PersonnesService._instance === undefined) {
            PersonnesService._instance = new PersonnesService(model);
        }
        return PersonnesService._instance;
    }
}

export default PersonnesService;