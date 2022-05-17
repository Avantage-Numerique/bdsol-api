

export default class QueryBuilder {

    /**
     * @method QueryBuilder Forme la requête de condition à envoyer à mongoose.
     * 
     * Paramètre :
     * @param {name:value} query  - Les critère de recherche
     * 
     * Retourne :
     * @return {object} finalQuery est un objet contenant la totalité des conditions associé à la recherche
     */
    static build(query:any) {

        let finalQuery = {};
        
        const prop = Object.keys(query)
        const value = Object.values(query)
        for (let i = 0; i <= prop.length; i++)
        {
            let p = prop[i];
            let v = value[i];

            //S'il s'agit d'un id
            if ( p == "id" )//@ts-ignore
                finalQuery._id = value;
            
            //S'il s'agit d'une date
            else if ( p == "createdAt" || p == "updatedAt" ){//@ts-ignore
                if (value.substring(0,1) == '<')//@ts-ignore
                    finalQuery[p] = { $lte: v.substring(1, v.length) };

                if (query.createdAt.substring(0,1) == '>')//@ts-ignore
                    finalQuery[p] = { $gte: v.substring(1, v.length) };
            }

            //Si ce n'est ni une date ni un Id
            else{ //@ts-ignore
                finalQuery[p] = { $regex: v , $options : 'i' };
            }
        }

        return finalQuery;
    }
}