/**
 * Populate field on pre "find"
 * @param document {any} The mongoose document
 * @param schemaProperty {string} The parameters in the document to populate (with the ref value).
 * @param fieldToPopulate {string} Field to get from this populate.
 * @param model {any} if we need to populate between DB. This is the second schema.
 * @inheritDoc https://mongoosejs.com/docs/6.x/docs/populate.html
 */
const mongoosePopulate = (document: any,
                          schemaProperty: string,
                          fieldToPopulate?: string,
                          model: any = undefined) => {

    //populate method have a property called options.

    let populateOptions: { path: string, select?: string | undefined, model?: any } = {
        path: schemaProperty
    }

    if (fieldToPopulate !== undefined) {
        populateOptions.select = fieldToPopulate;
    }

    if (model !== undefined) {
        populateOptions.model = model;
    }

    document.populate(populateOptions);
}

export {mongoosePopulate};