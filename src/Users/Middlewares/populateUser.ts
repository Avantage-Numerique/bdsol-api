import {mongoosePopulate} from "../../Database/Middlewares/mongoosePopulate";
import {User} from "@src/Users/Models/User";

/**
 * Populate field on pre "find"
 * @param document {any} The mongoose document
 * @param schemaProperty {string} The parameters in the document to populate (with the ref value).
 * @param fieldToPopulate {string} Field to get from this populate.
 * @param model {any} if we need to populate between DB. This is the second schema.
 * @inheritDoc https://mongoosejs.com/docs/6.x/docs/populate.html
 */
const populateUser = (document: any,
                      schemaProperty: string
) => {
    const appModel = User.getInstance();
    mongoosePopulate(document, schemaProperty, appModel.publicFields(), appModel.mongooseModel);
}

export {populateUser};