/**
 * Populate field on pre "find"
 * @param document {any} The mongoose document
 * @param schemaProperty {string} The parameters in the document to populate (with the ref value).
 * @param fieldToPopulate {string} Specify which field of underlying object to populate ( spaced string. E.g. "name slug createdAt" )
 * @default fieldToPopulate if not specified, it will populate all field
 */
const middlewarePopulateProperty = (document:any,
                                  schemaProperty:string = 'occupations',
                                  fieldToPopulate?:string) => {
    
    document.populate(schemaProperty, fieldToPopulate);
}

export {middlewarePopulateProperty};