import {defaultModifier, objectIdModifier, PropertyModifier} from "./PropertyModifier";

/**
 * Tool to transpose query from Routes into Mongo DB query. Structure with only static method and properties.
 * The vocabulary of methods and variables.
 * With this exemple : {category: "Taxonomy"} :
 * `Query`: if the full object passed via a call to the api.
 * `Field` : is the base of the query element, like _id, quantity, etc. In the exemple, category is the field.
 * `Property` : the properties are the query language. We accepte the `supportedProperties` keyword for now.
 */
export default class ApiQuery {

    static initQuery:any;
    static query:any;
    static propertySeperator:string = ":";
    static queryProperties:any = {
        gte: {
            queryProperty: '$gte'
        },
        lte: {
            queryProperty: '$lte'
        },
        not: {
            queryProperty: '$not'
        },
        ne: {
            queryProperty: '$ne'
        }
    }

    static fieldPropertiesModifiers:any = {
        "_id": objectIdModifier
    }

    /**
     * @method ApiQuery Forme la requête de condition à envoyer à mongoose.
     * @param {key:value} query  - Les critères de recherche
     * @return {object} finalQuery est un objet contenant les conditions de recherche adaptée pour mongo
     * @note NE FONCTIONNE PAS PRÉSENTEMENT AVEC LES NOMBRES PUISQUE JE CONVERTIS LES NOMBRES EN STRING!
     */
    static build(query:any) {

        //const finalQuery:any = {};
        ApiQuery.query = {};
        ApiQuery.initQuery = query;

        //default sort.
        ApiQuery.query.sort = {
            updatedAt : -1
        };

        for (const field in query)
        {
            //Allow "offers.offer" to be directly assigned without options ($regex, $option are not allowed)
            const noOption = field.split(".").length > 1;

            if (ApiQuery.fieldIsDeclared(field))
            {
                const value:any = query[field]//.toString();//@todo : Add a try/catch for this ?

                // If the field is an id check, but brute, no property sets.
                if ((field === "id" || field === "_id") &&
                    (value !== "" && value !== undefined && !ApiQuery.haveProperty(value))) {    // sauf si
                    ApiQuery.query._id = value;
                    continue;
                }

                if (field == "sort") {
                    ApiQuery.query.sort.updatedAt = value === "asc" ? 1 : -1;
                    continue;
                }

                if (ApiQuery.haveProperty(value)) {
                    const modifier:PropertyModifier = ApiQuery.fieldPropertiesModifiers[field] ?? defaultModifier;//this should be a list too to assign modifier to target type of field. For now _id seem to be the only one needed for that.
                    ApiQuery.query[field] = ApiQuery.propertyToQueryObject(value, modifier);
                }

                //  Si ce n'est pas un Id ou si on cherche une date précise (field == date).
                if (!ApiQuery.haveProperty(value)) {
                    if (noOption)
                        ApiQuery.query[field] = value;
                    else
                    ApiQuery.query[field] = { $regex: value, $options : 'i' };
                }
            }
        }
        return ApiQuery.query;
    }

    /**
     * Loop through the supported Query properties to check if the query have it in string, like gte:
     * if the loop check that if have property
     * @param value
     * @param modifier {any} Modifier the value that will be set to the property.
     * @param field {string} precise the field that this will be added to.
     */
    static propertyToQueryObject(value:string, modifier:PropertyModifier=defaultModifier, field:string=""):any
    {
        const queryProperty:any = {};
        for (const supportedProperty in ApiQuery.queryProperties)
        {
            const propertyParams:any = ApiQuery.queryProperties[supportedProperty];
            const propertyPrefix:string = `${supportedProperty}${ApiQuery.propertySeperator}`;

            if (ApiQuery.haveProperty(value, propertyPrefix)) {
                queryProperty[propertyParams.queryProperty] = modifier(ApiQuery.queryPropertyValue(value, propertyPrefix.length));
                return queryProperty;
            }
        }
    }


    /**
     * Check if the value have a seperator within his value,
     * @param value {string} the field value raw
     * @param propertysValueSeperator {string} would be equal to ApiQuery.propertySeperator
     */
    static haveProperty(value:string, propertysValueSeperator:string=":") {
        if (typeof value === "string") {//this could happen so keep the warning. I was able to pass object there.
            return value.includes(propertysValueSeperator);
        }
        return false;
    }


    /**
     * Remove the property from the value within the string passed.
     * @param fieldValue {string} the field value passed
     * @param position {number} What is the string index of the real field value.
     */
    static queryPropertyValue(fieldValue:string, position:number = 4) {
        return fieldValue.substring(position, fieldValue.length);
    }


    /**
     * Utils to check if the initQuery sets is valid within a static method
     * @param field {string} The field value passed
     * @return {boolean}
     */
    static fieldIsDeclared(field:string):boolean {
        return ApiQuery.queryIsValid()
            && ApiQuery.initQuery[field] !== null
            && ApiQuery.initQuery[field] !== undefined;
    }


    /**
     * Utils to check if the query is set and an object.
     * @return {boolean} if the query is an object, and not null/undefined.
     */
    static queryIsValid():boolean {
        return ApiQuery.initQuery !== null
            && ApiQuery.initQuery !== undefined
            && typeof ApiQuery.initQuery === "object";
    }

}