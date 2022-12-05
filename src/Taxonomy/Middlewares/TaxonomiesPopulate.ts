/**
 * Populate field on pre "find"
 * @param document {any} The mongoose document
 * @param schemaProperty {string} The parameters in the document to populate (with the ref value).
 */
const middlewarePopulateProperty = (document:any,
                                  schemaProperty:string = 'occupations',
                                  fieldToPopulate?:string) => {
    
    //Note : I think we can pass "schemaProperty" and add a 2nd param to specify which field we want to populate from the underlying entity                                
    document.populate(schemaProperty, fieldToPopulate);
}

export {middlewarePopulateProperty};