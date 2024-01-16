import {defaultModifier, objectIdModifier, PropertyModifier, stringToArrayModifier} from "./PropertyModifier";
import ApiQuery from "./ApiQuery";


/**
 * Tool to transpose query from Routes into Mongo DB query. Structure with only static method and properties.
 * The vocabulary of methods and variables.
 * With this exemple : {category: "Taxonomy"} :
 * `Query`: if the full object passed via a call to the api.
 * `Field` : is the base of the query element, like _id, quantity, etc. In the exemple, category is the field.
 * `Property` : the properties are the query language. We accepte the `supportedProperties` keyword for now.
 */
export default class QueryBuilder {

    static initQuery:any;
    static query:ApiQuery;
    //static queries:Map<string, any>;
    static propertySeperator:string = ":";
    static logicalSections:any = {
        and: {
            queryProperty: '$and'
        },
        or: {
            queryProperty: '$or'
        }
        //match ? THis need to have recursive crawling in to be worth it, I think.
        //not ? could be implemented quickly
    }

    //Comparison
    static queryProperties:any = {
        gte: {
            queryProperty: '$gte'
        },
        lte: {
            queryProperty: '$lte'
        },
        gt: {
            queryProperty: '$gt'
        },
        lt: {
            queryProperty: '$lt'
        },
        ne: {
            queryProperty: '$ne'
        },
        in: {
            queryProperty: '$in',
            modifier: stringToArrayModifier
        },
        objId: {
            queryProperty: ""
        }
    }

    /**
     * Modifiers are used to change the query value. Like for now for every _id we apply the objectIdModifier.
     * in, we
     */
    static fieldPropertiesModifiers: any = {
        "_id": objectIdModifier,
        "id": objectIdModifier
    }

    /**
     * Called in controllers, it's the entry point to get a query.
     * @param query
     * @param returnFullObject
     */
    static build(query:any, returnFullObject=false) {
        const parsedQuery = QueryBuilder.parseQuery(query);
        return returnFullObject ? parsedQuery : parsedQuery.transmuted;
    }

    /**
     * Parse the query to isolate section and properties.
     * May be recursive to permet subsections.
     * A section is a prefix (as a key) with an array of properties
     * @param query
     */
    static parseQuery(query:any) {

        const currentQuery:ApiQuery = new ApiQuery(query);

        //Parse, check if it's a section, validate it, transform it, stock it in query.sections and delete the params ready fo the params parsing.

        /**
         * Flow of the QueryBuilder
         * 1. Parsing for section in currentQuery.
         *      1. Loop throught parse section and
         *      2. Save it into the query.sections array.
         *      3. Delete it from the raw params of the query.
         * 2. Loop through the rest of the query.raw (without the sections params.
         * 3. parse them to transform the param:value elements.
         */

        QueryBuilder.parseSections(currentQuery);
        const parsedQuery = QueryBuilder.parseParams(currentQuery.raw);
        currentQuery.raw = parsedQuery.query;
        currentQuery.options = parsedQuery.options;
        return currentQuery;
    }


    static parseSections(query:ApiQuery):void {
        //loop through the raw query to validate if it has a section {logical: [section params object Array]}
        for (const logicalParam in query.raw)
        {
            if (QueryBuilder.isSupportedLogicalParam(logicalParam))
            {
                const logicalParamParsed:any = QueryBuilder.logicalSections[logicalParam];
                const logicalParamSettings:any = query.raw[logicalParam];
                const logicalSectionCandidate:any = {
                    [logicalParamParsed.queryProperty]: logicalParamSettings
                };

                //parse each section queries.
                if (QueryBuilder.isLogicalSection(logicalSectionCandidate))
                {
                    const parseSectionSubParams = [];
                    const parseSectionSubOptions = [];

                    if (Array.isArray(logicalParamSettings)) {

                        for (const sectionSubParam of logicalParamSettings) {

                            const parsedSectionSubParamsQuery = QueryBuilder.parseParams(sectionSubParam);
                            parseSectionSubParams.push(parsedSectionSubParamsQuery.query);
                            parseSectionSubOptions.push(parsedSectionSubParamsQuery.options);
                        }
                    }

                    const logicalSectionCandidate:any = {[logicalParamParsed.queryProperty]: parseSectionSubParams};

                    query.sections.push(logicalSectionCandidate);
                    delete query.raw[logicalParam];
                }
            }
        }
    }

    /**
     * @method ApiQuery Forme la requête de condition à envoyer à mongoose.
     * @param {key:value} query  - Les critères de recherche
     * @return {object} finalQuery est un objet contenant les conditions de recherche adaptée pour mongo
     * @note NE FONCTIONNE PAS PRÉSENTEMENT AVEC LES NOMBRES PUISQUE JE CONVERTIS LES NOMBRES EN STRING!
     */
    static parseParams(query:any):any {
        const parsedQuery:any = {};
        const options:any = {};
        for (const field in query)
        {
            const value:any = query[field];
            // If the field is an id check, but brute, no property sets.
            if ((field === "id" || field === "_id") &&
                (value !== "" && value !== undefined && !QueryBuilder.haveProperty(value))) {    // sauf si
                //const modifier = QueryBuilder.fieldPropertiesModifiers['_id'] ?? defaultModifier;
                //parsedQuery._id = modifier(value);
                parsedQuery._id = value;
                continue;
            }

            if (field == "sort") {
                options.sort = {
                    updatedAt: value === "asc" ? 1 : -1
                }
                delete query[field];
                continue;
            }

            if (field == "limit" && Number(query[field]) > 0) {
                options.limit = Number(query[field]);
                delete query[field];
                continue;
            }
            if (field == "skip" && Number(query[field]) >= 0) {
                options.skip = Number(query[field]);
                delete query[field];
                continue;
            }

            if (QueryBuilder.fieldIsDeclared(field, query)) {
                const like = !(field.split(".").length > 1);//Allow "offers.offer" to be directly assigned without options ($regex, $option are not allowed)
                parsedQuery[field] = QueryBuilder.parseParam(field, query[field], like);
            }
        }
        return {query:parsedQuery, options: options};
    }

    static parseParam(field:any, value:any, like:boolean=true):any {

        let parsedValue:any;
        let fieldChanged = false;

        if (QueryBuilder.haveProperty(value)) {
            // for now we only have ObjectId modifier for properties.
            const modifier:PropertyModifier = QueryBuilder.fieldPropertiesModifiers[field] ?? defaultModifier;  //this should be a list too to assign modifier to target type of field. For now _id seem to be the only one needed for that.

            parsedValue = QueryBuilder.propertyToQueryObject(value, modifier);
            fieldChanged = true;
        }

        //don't apply these options if the value contains property to transpose.
        if (!QueryBuilder.haveProperty(value)) {
            //  Si ce n'est pas un Id ou si on cherche une date précise (field == date).
            if (!like)
                parsedValue = value;
            else
                parsedValue = { $regex: value, $options : 'i' };

            fieldChanged = true;
        }
        return fieldChanged ? parsedValue : value;
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
        for (const supportedProperty in QueryBuilder.queryProperties)
        {
            const propertyParams:any = QueryBuilder.queryProperties[supportedProperty];
            const propertyModifier:any = propertyParams.modifier ?? defaultModifier;
            const propertyPrefix:string = `${supportedProperty}${QueryBuilder.propertySeperator}`;

            if (QueryBuilder.haveProperty(value, propertyPrefix)) {
                if (propertyParams.queryProperty !== "") {
                    queryProperty[propertyParams.queryProperty] = modifier(
                        propertyModifier(QueryBuilder.queryPropertyValue(value, propertyPrefix.length))
                    );
                    return queryProperty;
                }
                return modifier(QueryBuilder.queryPropertyValue(value, propertyPrefix.length));
            }
        }
    }


    /**
     * Check if the value have a seperator within his value,
     * @param value {string} the field value raw
     * @param propertysValueSeperator {string} would be equal to ApiQuery.propertySeperator
     */
    static haveProperty(value:string, propertysValueSeperator:string=":") {
        if (typeof value === "string") {//this could happen so keep the IDE warning. I was able to pass object there.
            return value.includes(propertysValueSeperator);
        }
        return false;
    }


    /**
     * Loop through the supported Query properties to check if the query have it in string, like gte:
     * if the loop check that if have property
     * @param value {Array<any>} the section array.
     * @param field {string} precise the field that this will be added to.
     */
    static sectionLogicalParamSupported(value:Array<any>, field:string=""):any
    {
        if (QueryBuilder.isSupportedLogicalParam(field)) {
            const logicalParam:any = QueryBuilder.logicalSections[field];
            return {[logicalParam.queryProperty]: value};
        }
        return false
    }


    /**
     * Check if the target param candidate is sets in the LogicalSection object.
     * @param candidate {string} The logical params to check if we support it.
     */
    static isSupportedLogicalParam(candidate:string) {
        return Object.keys(QueryBuilder.logicalSections).includes(candidate);
    }


    /**
     * check if the structure of the candidate section is form as a key included in the ApiQuery.querySections and a value of an array.
     * @param candidate
     */
    static isLogicalSection(candidate:any) {

        if ((typeof candidate === "object")) {
            let candidatePropertiesAreValid = false;
            let candidatePropertiesWrong = 0;
            let candidatePropertiesGood = 0

            //check if the subproperties of the sections are objects.
            for (const candidatePropertyName of Object.keys(candidate))
            {
                const candidateProperty = candidate[candidatePropertyName];
                candidatePropertiesAreValid = typeof candidatePropertyName === "string" && Array.isArray(candidateProperty);

                if (candidatePropertiesAreValid) candidatePropertiesGood++;
                if (!candidatePropertiesAreValid) candidatePropertiesWrong++;
            }
            return candidatePropertiesAreValid;
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
     * @param query {ApiQuery} The field value passed
     * @return {boolean}
     */
    static fieldIsDeclared(field:string, query:any):boolean {
        return query[field] !== null
            && query[field] !== undefined;
    }


    /**
     * @deprecated Utils to check if the query is set and an object.
     * @return {boolean} if the query is an object, and not null/undefined.
     */
    static queryIsSet(query:ApiQuery):boolean {
        return query.initQuery !== null
            && query.initQuery !== undefined
            && typeof query.initQuery === "object";
    }

}