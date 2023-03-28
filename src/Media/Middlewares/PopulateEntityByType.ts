import {mongoosePopulate} from "../../Database/Middlewares/mongoosePopulate";
import Person from "../../Persons/Models/Person";
import Organisation from "../../Organisations/Models/Organisation";

/**
 * Populate target entity by type (for Media to : Org, Person, etc.
 * @param document {any} The mongoose document
 * @param schemaProperty {string} The parameters in the document to populate (with the ref value).
 * @param model {any} if we need to populate between DB. This is the second schema.
 */
const PopulateEntityByType = (document: any,
                                    schemaProperty: string = 'occupations',
                                    model: any = undefined) => {
    let fieldToPopulate:string = "";
    if (model === undefined) {
        console.log(document, document.entityType);
        switch (document.entityType) {
            case "person":
            case "Person":
                model = Person.getInstance().mongooseModel;
                fieldToPopulate = "firstName lastName slug";
                break;

            case "organisation":
            case "Organisation":
                model = Organisation.getInstance().mongooseModel;
                fieldToPopulate = "name slug";
                break;
        }
        mongoosePopulate(document, schemaProperty, fieldToPopulate, model);
    }
    //skip.
}


export {PopulateEntityByType};