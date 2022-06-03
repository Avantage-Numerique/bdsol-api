

export default class QueryBuilder {

    /**
     * @method QueryBuilder Forme la requête de condition à envoyer à mongoose.
     * 
     * Paramètre :
     * @param {key:value} query  - Les critère de recherche
     * 
     * Retourne :
     * @return {object} finalQuery est un objet contenant les conditions de recherche adaptée pour mongo
     */
    static build(query:any) {

        const finalQuery = {};
        
        for (const field in query){

            //S'il s'agit d'un id
            if ( field == "id" )//@ts-ignore
                finalQuery._id = query[field];
            
            //S'il s'agit d'une date
            else if ( field == "createdAt" || field == "updatedAt" ){//@ts-ignore
                if (query[field].substring(0,1) == '<')//@ts-ignore
                    finalQuery[field] = { $lte: query[field].substring(1, query[field].length) };

                if (query[field].substring(0,1) == '>')//@ts-ignore
                    finalQuery[field] = { $gte: query[field].substring(1, query[field].length) };
            }

            //Si ce n'est ni une date ni un Id
            else{ //@ts-ignore
                finalQuery[field] = { $regex: query[field].toString() , $options : 'i' };
            }
        }

        return finalQuery;
    }
}