import {mongoosePopulate} from "../../Database/Middlewares/mongoosePopulate";

/**
 * Populate target entity by type (for Media to : Org, Person, etc.
 * @param query {any} The mongoose document
 * @param schemaProperty {string} The parameters in the document to populate (with the ref value).
 */
const PopulateEntityByType = (query: any,
                                    schemaProperty: string = 'occupations') => {

    mongoosePopulate(query, schemaProperty);
    //skip.
}


export {PopulateEntityByType};