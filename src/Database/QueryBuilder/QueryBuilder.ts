
export default class QueryBuilder {

    static initQuery:any;
    static query:any;
    static propertySeperator:string = ":";
    static supportedProperties:any = {
        gte: {
            queryProperty: '$gte'
        },
        lte: {
            queryProperty: '$lte'
        }
    }

    /**
     * @method QueryBuilder Forme la requête de condition à envoyer à mongoose.
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
        QueryBuilder.query = {};
        QueryBuilder.initQuery = query;

        let value:any;
        for (const field in query)
        {
            if (QueryBuilder.fieldIsDeclared(field))
            {

                value = query[field].toString();//@todo : Add a try/catch for this ?

                //  S'il s'agit d'un id
                if (field == "id") {
                    QueryBuilder.query._id = value;
                }

                if (QueryBuilder.haveProperty(value)) {
                    QueryBuilder.query[field] = QueryBuilder.propertyToQueryObject(value);
                }

                //  Si ce n'est pas un Id ou si on cherche une date précise (field == date).
                if (!QueryBuilder.haveProperty(value)) {
                    QueryBuilder.query[field] = { $regex: value, $options : 'i' };
                }
            }
        }

        return QueryBuilder.query;
    }

    /**
     * Loop through the supported Query properties to check if the query have it in string, like gte:
     * if the loop check that if have property
     * @param value
     */
    static propertyToQueryObject(value:string):any
    {
        let queryProperty:any = {};
        for (const supportedProperty in QueryBuilder.supportedProperties)
        {
            const propertyParams:any = QueryBuilder.supportedProperties[supportedProperty];

            if (QueryBuilder.haveProperty(value, supportedProperty + QueryBuilder.propertySeperator)) {
                return queryProperty[propertyParams.queryProperty] = QueryBuilder.queryPropertyValue(value);
            }
        }
    }


    /**
     * Check if the value have a seperator within his value,
     * @param value {string} the field value raw
     * @param propertysValueSeperator {string} would be equal to QueryBuilder.propertySeperator
     */
    static haveProperty(value:string, propertysValueSeperator:string=":") {
        return value.includes(propertysValueSeperator);
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
        return QueryBuilder.queryIsValid()
            && QueryBuilder.initQuery[field] !== null
            && QueryBuilder.initQuery[field] !== undefined;
    }


    /**
     * @return {boolean} if the query is an object, and not null/undefined.
     */
    static queryIsValid():boolean {
        return QueryBuilder.initQuery !== null
            && QueryBuilder.initQuery !== undefined
            && typeof QueryBuilder.initQuery === "object";
    }


    // this is awesome, for better and more case of lte
}