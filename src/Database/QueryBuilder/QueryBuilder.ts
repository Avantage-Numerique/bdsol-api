import LogHelper from "../../Monitoring/Helpers/LogHelper";

export default class ApiQuery {

    static initQuery:any;
    static query:any;
    static propertySeperator:string = ":";
    static supportedProperties:any = {
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

    /**
     * @method ApiQuery Forme la requête de condition à envoyer à mongoose.
     *
     * Paramètre :
     * @param {key:value} query  - Les critère de recherche
     *
     * Retourne :
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
                //  S'il s'agit d'un id

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
                    ApiQuery.query[field] = ApiQuery.propertyToQueryObject(value);
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
        LogHelper.debug("QueryBuilder result", ApiQuery.query);
        return ApiQuery.query;
    }

    /**
     * Loop through the supported Query properties to check if the query have it in string, like gte:
     * if the loop check that if have property
     * @param value
     */
    static propertyToQueryObject(value:string):any
    {
        const queryProperty:any = {};
        for (const supportedProperty in ApiQuery.supportedProperties)
        {
            const propertyParams:any = ApiQuery.supportedProperties[supportedProperty];

            if (ApiQuery.haveProperty(value, supportedProperty + ApiQuery.propertySeperator)) {
                queryProperty[propertyParams.queryProperty] = ApiQuery.queryPropertyValue(value);
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
        if (typeof value === "string") {//this could happen
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
        return fieldValue.substring(4, fieldValue.length);
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
     * @return {boolean} if the query is an object, and not null/undefined.
     */
    static queryIsValid():boolean {
        return ApiQuery.initQuery !== null
            && ApiQuery.initQuery !== undefined
            && typeof ApiQuery.initQuery === "object";
    }


    // this is awesome, for better and more case of lte
}