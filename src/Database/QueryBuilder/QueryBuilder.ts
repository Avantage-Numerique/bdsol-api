import LogHelper from "../../Monitoring/Helpers/LogHelper";


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

        const finalQuery:any = {};
        
        for (const field in query){

            //S'il s'agit d'un id
            if ( field == "id" )
                finalQuery._id = query[field];
            
            //NE FONCTIONNE PAS PRÉSENTEMENT AVEC LES NOMBRES PUISQUE JE CONVERTIS LES NOMBRES EN STRING!
            //S'il s'agit d'une donnée où tente d'applique un ">=" (gte)
            else if ( query[field].toString().indexOf("gte:") == 0 ){
                finalQuery[field] = { $gte: query[field].toString().substring(4, query[field].length) };
            }
            //S'il s'agit d'une donnée où on applique un "<=" (lte)
            else if ( query[field].toString().indexOf("lte:") == 0 ){
                finalQuery[field] = { $lte: query[field].toString().substring(4, query[field].length) };
            }

            //Si ce n'est pas un Id ou si on cherche une date précise (field == date).
            else{
                finalQuery[field] = { $regex: query[field].toString() , $options : 'i' };
            }
        }

        return finalQuery;
    }
}