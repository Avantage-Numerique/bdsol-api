import Occupation from "../Models/Occupation"
import OccupationsService from "../Services/OccupationsService";
import AbstractController from "../../../Abstract/Controller"

class OccupationsController extends AbstractController {

    private static _instance:AbstractController;
    /** @public PersonneService */
    public service:OccupationsService;
    entity:Occupation;

    constructor()
    {
        super();
        this.entity = new Occupation();
        this.service = new OccupationsService(this.entity);
    }

    public static getInstance():AbstractController
    {
        if (OccupationsController._instance === undefined) {
            OccupationsController._instance = new OccupationsController();
        }
        return OccupationsController._instance;
    }
}

export {OccupationsController};