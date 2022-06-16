import Personne from "../Models/Personne"
import PersonnesService from "../Services/PersonnesService";
import AbstractController from "../../Abstract/Controller"

class PersonnesController extends AbstractController {

    /** @public PersonneService */
    public service:PersonnesService;
    entity:Personne;

    /** @constructor */
    constructor() {
        super();
        this.entity = new Personne();
        this.service = new PersonnesService(this.entity);
    }

}

export {PersonnesController};