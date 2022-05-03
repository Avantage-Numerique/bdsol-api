import LogHelper from "../../Monitoring/Helpers/LogHelper";
import Personne from "../Models/Personne"
import {ApiResponseContract} from "../../Http/Responses/ApiResponse";
import PersonnesService from "../Services/PersonnesService";
import {PersonneSchema} from "../Schemas/PersonneSchema";
import HttpError from "../../Error/HttpError";

class PersonnesController {

    /** @public PersonneService */
    public service:PersonnesService;

    /** @constructor */
    constructor() {
        this.service = new PersonnesService(Personne.getInstance());
    }


    /**
     * @method create permet de créer et d'insérer une nouvelle entité "Personne" dans la base de donnée à partir de la requête.
     * 
     * Paramètres : 
     *      @param {name:value} requestData - attributs requis à la création d'une personne
     * 
     * Retourne :
     *      @return {ApiResponseContract}
    */
    public async create(requestData:any):Promise<ApiResponseContract> {
        let messageValidate = this.validateData(requestData);
        if (!messageValidate.isValid)
            return HttpError.NotAcceptable(messageValidate.message);

        let formatedData = this.formatRequestDataForDocument(requestData);
        let createdDocumentResponse = await this.service.insert(formatedData);
        
        if (createdDocumentResponse !== undefined &&
            !createdDocumentResponse.error)
            return createdDocumentResponse;

        return HttpError.NotAcceptable('Échec de la création d\'une Personne');
    }

    
    /** 
     * @method update permet de modifier et mettre à jour les attributs d'une personne dans la base de donnée.
     * 
     * Paramètres :
     *      @param {name:value} requestData - id et attributs à modifier.
     * 
     * Retourne :
     *      @return {ApiResponseContract} 
     */
    public async update(requestData:any):Promise<ApiResponseContract> {
        
        //Validation des données
        let messageUpdate = this.validateData(requestData);
        if (!messageUpdate.isValid)
            return HttpError.NotAcceptable(messageUpdate.message);

        //Validation ID
        if (requestData.id === undefined)
            return HttpError.NotAcceptable("Aucun no. d'identification fournit");
        
        let formatedData = this.formatRequestDataForDocument(requestData);
        let updatedModelResponse:any = await this.service.update(requestData.id, formatedData);

        if (updatedModelResponse !== undefined)
            return updatedModelResponse;

        return HttpError.NotAcceptable('Échec de l\'update d\'une Personne');
    
    }

    /**
     * @method search permet d'effectuer une recherche afin de retourner la première personne répondant au critère de recherche.
     * @todo La recherche par id n'est pas implémentée
     * 
     * Paramètre : 
     *      @param {name:value} requestData - { "nom":"Jean" (*Critère de recherche*) }
     * 
     * Retourne : 
     *      @default critères vide: Retourne le premier résultat
     *      @return {ApiResponseContract}
    */
 
    public async search(requestData:any):Promise<ApiResponseContract> {
        LogHelper.log("Début de la recherche dans la liste");
        if (requestData.id !== undefined){
            LogHelper.debug("La recherche par id n'est pas implémentée");
        }
        
        let query = this.tempQueryBuilder(requestData);
 
        return await this.service.get(query);
    }

    /**
     * @method list permet d'obtenir une liste de personne pouvant être filtré.
     * @todo La recherche par id n'est pas implémentée
     * 
     * Paramètres : 
     *      @param {name:value} requestData - { "nom":"Jean" (*Critère de recherche*) }
     * 
     * Retourne : 
     *      @return 
    */
    public async list(requestData:any):Promise<ApiResponseContract> {
        LogHelper.log("Début de la requête d'obtention de la liste de personne");
        if (requestData.id !== undefined){
            LogHelper.debug("La recherche par id n'est pas implémentée");
        }

        let query = this.tempQueryBuilder(requestData);

        return await this.service.all(query);
    }

    /**
     * @method delete permet d'effectuer une suppression de la fiche d'une personne dans la base de données.
     * @todo
     * Paramètres : 
     *      @param 
     * 
     * Retourne : 
     *      @return 
    */
    public async delete():Promise<void> {
        LogHelper.log("Début de la suppression d'une personne");
        LogHelper.log("Réussite de la suppression d'une personne");
        LogHelper.log("Échec de la suppression d'une personne");
        return;
    }

    /**
     * @method validateData valide les éléments pour l'entitée Personne s'ils sont présent.
     * 
     * Paramètres :
     *      @param {name:value} requestData - attributs de personne à valider
     * 
     * Retourne : validité et message d'erreur
     *      @return {object} { isValid, message } :
     *          @desc isValid (boolean): représentant si les données sont validée
     *          @desc message (string) : décrivant l'échec ou réussite de la validation 
     */
    public validateData(requestData:any): {isValid:boolean, message:string} {

        LogHelper.log(`Validating ${typeof requestData}`, requestData);
        let isValid = true;
        let message = "";

        if (typeof requestData === 'object')
        {
            //Verification data est vide
            if (requestData.nom === undefined &&
                requestData.prenom === undefined &&
                requestData.surnom === undefined &&
                requestData.description === undefined){
                    isValid = false;
                    message += "Data doit contenir un champ. ";
                }

            //Si n'est pas vide
            else{
                //Validation Nom
                //Le (if nom !== undefined) est inutile (à effacer au besoin)
                if (requestData.nom !== undefined){
                    if (!Personne.isNomOrPrenomValid(requestData.nom)){
                        isValid = false;
                        message += "Le paramètre 'nom' est problématique. "
                    }
                }

                //Validation prénom
                if(requestData.prenom !== undefined){
                    if (!Personne.isNomOrPrenomValid(requestData.prenom)){
                        isValid = false;
                        message += "Le paramètre 'prenom' est problématique. ";
                    }
                }
            }
        }
        //Si n'est pas un objet
        else{
            isValid = false;
            message += "La requête n'est pas un objet. "
        }

        return { isValid, message };      
    }


    /** 
     * @method formatRequestDataForDocument insère dans le schéma les données de la requête.
     * 
     * Paramètres :
     *      @param {name:value} requestData - attributs de Personne
     * 
     * Retourne :
     *      @return {PersonneSchema} l'interface Schéma contenant les données de la requête
     */
    public formatRequestDataForDocument(requestData:any) {
        return {
            nom: requestData.nom,
            prenom: requestData.prenom,
            surnom: requestData.surnom,
            description: requestData.description
        } as PersonneSchema;
    }

    /**
     * @method tempQueryBuilder Forme la requête de condition à envoyer à mongoose.
     * 
     * Paramètre :
     * @param {name:value} query  - Les critère de recherche
     * 
     * Retourne :
     * @return {object} finalQuery est la totalité des conditions associé à la recherche
     */
    public tempQueryBuilder(query:any) {

        let finalQuery = {};
        
        if ( query.id !== undefined)//@ts-ignore
            finalQuery._id = { $regex: query.id };

        if ( query.nom !== undefined)//@ts-ignore
            finalQuery.nom = { $regex: query.nom , $options : 'i' };

        if ( query.prenom !== undefined)//@ts-ignore
            finalQuery.prenom = { $regex : query.prenom , $options : 'i' };

        if ( query.surnom !== undefined)//@ts-ignore
        finalQuery.surnom = { $regex: query.surnom , $options : 'i' };

        if ( query.description !== undefined)//@ts-ignore
            finalQuery.description = { $regex: query.description , $options : 'i' };

        return finalQuery;
    }
}

export default PersonnesController;