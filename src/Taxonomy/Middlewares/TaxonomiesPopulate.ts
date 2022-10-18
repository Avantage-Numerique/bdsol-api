/**
 * Populate field on pre "find"
 * @param document {any} The mongoose document
 * @param schemaProperty {string} The parameters in the document to populate (with the ref value).
 */
const middlewarePopulateProperty = (document:any,
                                  schemaProperty:string = 'occupations') => {

    document.populate(schemaProperty);
}

export {middlewarePopulateProperty};