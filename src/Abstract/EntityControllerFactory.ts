import AbstractController from "./Controller";
import PersonsController from "../Persons/Controllers/PersonsController";
import OrganisationsController from "../Organisations/Controllers/OrganisationsController";
import TaxonomyController from "../Taxonomy/Controllers/TaxonomyController";
import MediasController from "../Media/Controllers/MediasController";

class EntityControllerFactory {

    public static getControllerFromEntity(entity:string):AbstractController{
        let instance;
        switch(entity){
            case "persons": instance = PersonsController.getInstance();break;
            case "organisations": instance = OrganisationsController.getInstance();break;
            case "taxonomies": instance = TaxonomyController.getInstance();break;
            case "medias": instance = MediasController.getInstance();break;

            default:instance = PersonsController.getInstance();//Maybe causing some problem eventually
        }
        return instance;
    }
}
export default EntityControllerFactory;