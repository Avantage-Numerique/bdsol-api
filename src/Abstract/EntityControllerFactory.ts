import AbstractController from "./Controller";
import PersonsController from "../Persons/Controllers/PersonsController";
import OrganisationsController from "../Organisations/Controllers/OrganisationsController";
import TaxonomyController from "../Taxonomy/Controllers/TaxonomyController";
import MediasController from "../Media/Controllers/MediasController";
import ProjectsController from "../Projects/Controllers/ProjectsController";
import EventsController from "@src/Events/Controllers/EventsController";
import PlacesController from "@src/Places/Controllers/PlacesController";
import EquipmentController from "@src/Equipment/Controllers/EquipmentController";
class EntityControllerFactory {

    public static typeList = ["person", "organisation", "taxonomy", "project", "media", "event", "place", "equipment"]

    public static getControllerFromEntity(entityType:string):AbstractController | undefined{
        let instance;
        switch(entityType.toLocaleLowerCase()){
            case "person":
                instance = PersonsController.getInstance();break;
            case "organisation":
                instance = OrganisationsController.getInstance();break;
            case "taxonomy":
                instance = TaxonomyController.getInstance();break;
            case "project":
                instance = ProjectsController.getInstance();break;
            case "event":
                instance = EventsController.getInstance();break;
            case "media":
                instance = MediasController.getInstance();break;
            case "place":
                instance = PlacesController.getInstance();break;
            case "equipment": 
                instance = EquipmentController.getInstance();break;

            default:instance = undefined;
        }
        return instance;
    }

    
}
export default EntityControllerFactory;