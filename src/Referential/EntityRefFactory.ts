import { refPerson } from "./Data/Entities/RefPerson";
import { refOrganisation } from "./Data/Entities/RefOrganisation";
import { refTaxonomy } from "./Data/Entities/RefTaxonomy";
import { refProject } from "./Data/Entities/RefProject";
import { refEvent } from "./Data/Entities/RefEvent";
import { refMedia } from "./Data/Entities/RefMedia";
import { refPlace } from "./Data/Entities/RefPlace";
import { refEquipment } from "./Data/Entities/RefEquipment";
import { RefProperty } from "./Data/types";

class EntityRefFactory {
    public static typeList = ["person", "organisation", "taxonomy", "project", "media", "event", "place", "equipment"];

    public static getRefFromEntity(entityType: string): RefProperty | undefined {
        let ref;
        switch (entityType.toLocaleLowerCase()) {
            case "person":
                ref = refPerson;
                break;
            case "organisation":
                ref = refOrganisation;
                break;
            case "taxonomy":
                ref = refTaxonomy;
                break;
            case "project":
                ref = refProject;
                break;
            case "event":
                ref = refEvent;
                break;
            case "media":
                ref = refMedia;
                break;
            case "place":
                ref = refPlace;
                break;
            case "equipment":
                ref = refEquipment;
                break;

            default:
                ref = undefined;
        }
        return ref;
    }
}
export default EntityRefFactory;
