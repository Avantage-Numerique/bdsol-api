import AbstractController from "./Controller";
import PersonsController from "../Persons/Controllers/PersonsController";
import OrganisationsController from "../Organisations/Controllers/OrganisationsController";
import TaxonomyController from "../Taxonomy/Controllers/TaxonomyController";
import MediasController from "../Media/Controllers/MediasController";
import ProjectsController from "../Projects/Controllers/ProjectsController";

class EntityControllerFactory {

    public static typeList = ["person", "organisation", "taxonomy", "project", "media"]

    public static getControllerFromEntity(entityType:string):AbstractController{
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
            case "media":
                instance = MediasController.getInstance();break;

            default:instance = PersonsController.getInstance();//Maybe causing some problem eventually
        }
        return instance;
    }

    
}
export default EntityControllerFactory;