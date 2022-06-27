import Personne from "../Models/Personne"
import PersonnesService from "../Services/PersonnesService";
import AbstractController from "../../Abstract/Controller"

class PersonnesController extends AbstractController {

    private static _instance:AbstractController;
    /** @public PersonneService */
    public service:PersonnesService;
    entity:Personne;

    constructor()
    {
        super();
        this.entity = Personne.getInstance();
        this.service = new PersonnesService(this.entity);
    }

    public static getInstance():AbstractController
    {
        if (PersonnesController._instance === undefined) {
            PersonnesController._instance = new PersonnesController();
        }
        return PersonnesController._instance;
    }
}

export {PersonnesController};