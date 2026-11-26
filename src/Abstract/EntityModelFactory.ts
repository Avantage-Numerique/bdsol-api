import AbstractModel from "./Model";
import Person from "@src/Persons/Models/Person";
import Organisation from "@src/Organisations/Models/Organisation";
import Taxonomy from "@src/Taxonomy/Models/Taxonomy";
import Media from "@src/Media/Models/Media";
import Project from "@src/Projects/Models/Project";
import Event from "@src/Events/Models/Event";
import Place from "@src/Places/Models/Place";
import Equipment from "@src/Equipment/Models/Equipment";
import EntityTypeFactory from "./EntityTypeFactory";

class EntityModelFactory {
    public static getModelInstanceFromEntity(entityType: string): AbstractModel | undefined {
        let instance;
        switch (entityType.toLocaleLowerCase()) {
            case "person":
                instance = Person.getInstance();
                break;
            case "organisation":
                instance = Organisation.getInstance();
                break;
            case "taxonomy":
                instance = Taxonomy.getInstance();
                break;
            case "project":
                instance = Project.getInstance();
                break;
            case "event":
                instance = Event.getInstance();
                break;
            case "media":
                instance = Media.getInstance();
                break;
            case "place":
                instance = Place.getInstance();
                break;
            case "equipment":
                instance = Equipment.getInstance();
                break;

            default:
                instance = undefined;
        }
        return instance;
    }

    public static getAllModels() {
        return EntityTypeFactory.typeList
            .map((type) => {
                const instance = EntityModelFactory.getModelInstanceFromEntity(type);

                if (!instance) {
                    return undefined;
                }

                return {
                    type,
                    instance,
                };
            })
            .filter(Boolean);
    }
}
export default EntityModelFactory;
