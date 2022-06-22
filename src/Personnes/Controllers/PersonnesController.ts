import LogHelper from "../../Monitoring/Helpers/LogHelper";
import Personne from "../Models/Personne"
import {ApiResponseContract} from "../../Http/Responses/ApiResponse";
import {StatusCodes, ReasonPhrases} from "http-status-codes";
import {ErrorResponse} from "../../Http/Responses/ErrorResponse";
import PersonnesService from "../Services/PersonnesService";
import {PersonneSchema} from "../Schemas/PersonneSchema";
import QueryBuilder from "../../Database/QueryBuilder/QueryBuilder";
import Validator from "../../Validation/Validator";
import {SuccessResponse} from "../../Http/Responses/SuccessResponse";

class PersonnesController {

    /** @public PersonneService */
    public service:PersonnesService;
    public validator = new Validator()

    /** @constructor */
    constructor() {
        this.service = new PersonnesService(Personne.getInstance());
    }


    /**
     * @method create permet de créer et d'insérer une nouvelle entité "Personne" dans la base de donnée à partir de la requête.
     * 
     * Paramètres : 
     *      @param {key:value} requestData - attributs requis à la création d'une personne
     * 
     * Retourne :
     *      @return {ApiResponseContract}
    */
    public async create(requestData:any):Promise<ApiResponseContract> {
        const messageValidate = this.validator.validateData(requestData, Personne.concatRuleSet("create"));
        if (!messageValidate.isValid)
            return ErrorResponse.create(
                new Error(ReasonPhrases.BAD_REQUEST),
                StatusCodes.BAD_REQUEST,
                messageValidate.message
                );

        const formattedData = this.formatRequestDataForDocument(requestData);
        const createdDocumentResponse = await this.service.insert(formattedData);
        
        if (createdDocumentResponse !== undefined)
            return createdDocumentResponse;

        LogHelper.debug("Le code manque de robustesse. Personnes/create");
        return ErrorResponse.create(
            new Error(ReasonPhrases.INTERNAL_SERVER_ERROR),
            StatusCodes.INTERNAL_SERVER_ERROR,
            'Les données semblent être ok, mais la création n\'a pas eu lieu.'
            );
    }

    
    /** 
     * @method update permet de modifier et mettre à jour les attributs d'une personne dans la base de donnée.
     * 
     * Paramètres :
     *      @param {key:value} requestData - id et attributs à modifier.
     * 
     * Retourne :
     *      @return {ApiResponseContract} 
     */
    public async update(requestData:any):Promise<ApiResponseContract> {
        
        //Validation des données
        const messageUpdate = this.validator.validateData(requestData, Personne.concatRuleSet("update"));
        if (!messageUpdate.isValid)
            return ErrorResponse.create(
                new Error(ReasonPhrases.BAD_REQUEST),
                StatusCodes.BAD_REQUEST,
                messageUpdate.message
                );

        const formattedData = this.formatRequestDataForDocument(requestData);
        const updatedModelResponse:any = await this.service.update(requestData.id, formattedData);

        if (updatedModelResponse !== undefined)
            return updatedModelResponse;

        LogHelper.debug("Le code manque de robustesse. Personnes/update");
        return ErrorResponse.create(
            new Error(ReasonPhrases.INTERNAL_SERVER_ERROR),
            StatusCodes.INTERNAL_SERVER_ERROR,
            'Les données semblent être ok, mais la mise à jour n\'a pas eu lieu.'
            );
    
    }

    /**
     * @method search permet d'effectuer une recherche afin de retourner la première personne répondant au critère de recherche.
     * 
     * Paramètre : 
     *      @param {key:value} requestData - { "nom":"Jean" (*Critère de recherche*) }
     * 
     * Retourne : 
     *      @default critères vide: Retourne le premier résultat
     *      @return {ApiResponseContract}
    */
 
    public async search(requestData:any):Promise<ApiResponseContract> {
        LogHelper.log("Début de la recherche dans la liste");

        const messageUpdate = this.validator.validateData(requestData, Personne.concatRuleSet("search"));
        if (!messageUpdate.isValid)
            return ErrorResponse.create(
                new Error(ReasonPhrases.BAD_REQUEST),
                StatusCodes.BAD_REQUEST,
                messageUpdate.message
                );

        const query = QueryBuilder.build(requestData);
        LogHelper.debug(query);
        return await this.service.get(query);
    }

    /**
     * @method list permet d'obtenir une liste de personne pouvant être filtré.
     * @todo La recherche par id n'est pas implémentée
     * 
     * Paramètres : 
     *      @param {key:value} requestData - { "nom":"Jean" (*Critère de recherche*) }
     * 
     * Retourne : 
     *      @return 
    */
    public async list(requestData:any):Promise<ApiResponseContract> {
        LogHelper.log("Début de la requête d'obtention de la liste de personne");

        const messageUpdate = this.validator.validateData(requestData, Personne.concatRuleSet("list"), true);
        if (!messageUpdate.isValid)
            return ErrorResponse.create(
                new Error(ReasonPhrases.BAD_REQUEST),
                StatusCodes.BAD_REQUEST,
                messageUpdate.message
                );

        const query = QueryBuilder.build(requestData);

        return await this.service.all(query);
    }

    /**
     * @method delete permet d'effectuer une suppression de la fiche d'une personne dans la base de données.
     * @todo
     * Paramètres : 
     *      @param {object} requestData contient le id de la personne à supprimer.
     * 
     * Retourne : 
     *      @return 
    */
     public async delete(requestData:any):Promise<ApiResponseContract> {
        LogHelper.log("Début de la suppression d'une personne");

        const messageUpdate = this.validator.validateData(requestData, Personne.concatRuleSet("delete"));
        if (!messageUpdate.isValid)
            return ErrorResponse.create(
                new Error(ReasonPhrases.BAD_REQUEST),
                StatusCodes.BAD_REQUEST,
                messageUpdate.message
                ); 
        
        return await this.service.delete(requestData.id);
    }

    /**
     * @method getInfo renvoi la liste des informations des champs de l'entité et les règle de validation de chaque champs.
     * Paramètres : 
     *      @param {object} requestData - contient "route" qui spécifie le retour des règles approprié
     * 
     * Retourne : 
     *      @return 
    */
     public async getInfo(requestData:any):Promise<ApiResponseContract> {
        LogHelper.log("Début de la création des informations du champs");

        if (typeof requestData === undefined || typeof requestData !== 'object' || Object.keys(requestData).length < 1)
            return ErrorResponse.create(
                new Error(ReasonPhrases.BAD_REQUEST),
                StatusCodes.BAD_REQUEST,
                "La requête n'est pas un objet. "
                );

        const info:any = Personne.infoChamp;
        info.state = requestData.route;

        const routeRules = Personne.concatRuleSet(requestData.route);
        Personne.infoChamp["champs"].forEach(function(value){
            //Insère les rules dans le champs
            value.rules = routeRules[value.name];
        });
        return SuccessResponse.create(info, StatusCodes.OK, ReasonPhrases.OK);
    }

    /** 
     * @method formatRequestDataForDocument insère dans le schéma les données de la requête.
     * 
     * Paramètres :
     *      @param {key:value} requestData - attributs de Personne
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
}

export {PersonnesController};