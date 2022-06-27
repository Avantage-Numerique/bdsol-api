import LogHelper from "../Monitoring/Helpers/LogHelper";
import {ApiResponseContract} from "../Http/Responses/ApiResponse";
import {StatusCodes, ReasonPhrases} from "http-status-codes";


import {ErrorResponse} from "../Http/Responses/ErrorResponse";
import Validator from "../Validation/Validator";
import AbstractModel from "./Model";
import { Service } from "../Database/Service";
import QueryBuilder from "../Database/QueryBuilder/QueryBuilder";
import {SuccessResponse} from "../Http/Responses/SuccessResponse";


abstract class AbstractController {

    abstract service:Service;
    abstract entity:AbstractModel;

    /**
     * @method create permet de créer et d'insérer une nouvelle entité dans la base de donnée à partir de la requête.
     * 
     * Paramètres : 
     * @param {any} requestData - L'objet data contenant les informations de la création d'entité
     *
     * Retourne :
     * @return {ApiResponseContract} en Promise
    */
    public async create(requestData:any):Promise<ApiResponseContract> {

        const messageValidate = Validator.validateData(requestData, this.entity.RuleSet("create"));

        if (!messageValidate.isValid)
            return ErrorResponse.create(
                new Error(ReasonPhrases.BAD_REQUEST),
                StatusCodes.BAD_REQUEST,
                messageValidate.message
            );

        //Can I just :  formatedData = {requestData}:Xschema
        const formatedData = this.entity.formatRequestDataForDocument(requestData);
        LogHelper.debug("create", requestData);
        const createdDocumentResponse = await this.service.insert(formatedData);

        if (createdDocumentResponse !== undefined)
            return createdDocumentResponse;


        LogHelper.debug("La réponse à la méthode insert est undefined");
        return ErrorResponse.create(
            new Error(ReasonPhrases.INTERNAL_SERVER_ERROR),
            StatusCodes.INTERNAL_SERVER_ERROR,
            'Le service. instert a retourné une réponse undefined'
        );
    }


    /** 
     * @method update permet de modifier et mettre à jour les attributs d'une entité dans la base de donnée.
     * 
     * Paramètres :
     *      @param {key:value} requestData - id et attributs de l'entité à modifier.
     * 
     * Retourne :
     *      @return {ApiResponseContract}  en Promise
     */
    public async update(requestData:any):Promise<ApiResponseContract> {
        
        //Validation des données
        const messageUpdate = Validator.validateData(requestData, this.entity.RuleSet("update"));
        if (!messageUpdate.isValid)
            return ErrorResponse.create(
                new Error(ReasonPhrases.BAD_REQUEST),
                StatusCodes.BAD_REQUEST,
                messageUpdate.message
                );

        const formatedData = this.entity.formatRequestDataForDocument(requestData);
        const updatedModelResponse:any = await this.service.update(requestData.id, formatedData);

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
     * @method search permet d'effectuer une recherche afin de retourner la première entité répondant au critère de recherche.
     * 
     * Paramètre : 
     *      @param {key:value} requestData - critère de recherche { "nom":"Jean" }
     * 
     * Retourne : 
     *      @default critères vide: Retourne le premier résultat
     *      @return {ApiResponseContract}
    */
    public async search(requestData:any):Promise<ApiResponseContract> {
        LogHelper.log("Début de la recherche dans la liste");
        

        const messageUpdate = Validator.validateData(requestData, this.entity.RuleSet("search"));
        if (!messageUpdate.isValid)
            return ErrorResponse.create(
                new Error(ReasonPhrases.BAD_REQUEST),
                StatusCodes.BAD_REQUEST,
                messageUpdate.message
            );

        //Validation date
        if (requestData.createdAt !== undefined &&
            //typeof data.createdAt == 'string' &&
            ( requestData.createdAt.substring(0,1) != '<' && requestData.createdAt.substring(0,1) != '>' ))
            return ErrorResponse.create(
                new Error(ReasonPhrases.BAD_REQUEST),
                StatusCodes.BAD_REQUEST,
                "Le premier caractère de createdAt doit être '<' ou '>'"
                );

        if (requestData.updatedAt !== undefined &&
            //typeof data.updatedAt == 'string' &&
            ( requestData.updatedAt.substring(0,1) != '<' && requestData.updatedAt.substring(0,1) != '>' ))
            return ErrorResponse.create(
                new Error(ReasonPhrases.BAD_REQUEST),
                StatusCodes.BAD_REQUEST,
                "Le premier caractère de updatedAt doit être '<' ou '>'"
                );

        const query = QueryBuilder.build(requestData);

        return await this.service.get(query);
    }


    /**
     * @method list permet d'obtenir une liste des entités selon les crières de recherche.
     * 
     * Paramètres : 
     *      @param {key:value} requestData - critère de recherche { "nom":"Jean" }
     * 
     * Retourne : 
     *      @return 
    */
    public async list(requestData:any):Promise<ApiResponseContract> {
        LogHelper.log("Début de la requête d'obtention de la liste de personne");
        

        const messageUpdate = Validator.validateData(requestData, this.entity.RuleSet("list"));
        if (!messageUpdate.isValid)
            return ErrorResponse.create(
                new Error(ReasonPhrases.BAD_REQUEST),
                StatusCodes.BAD_REQUEST,
                messageUpdate.message
                );

        //Validation date
        if (requestData.createdAt !== undefined &&
            //typeof data.createdAt == 'string' &&
            ( requestData.createdAt.substring(0,1) != '<' && requestData.createdAt.substring(0,1) != '>' ))
            return ErrorResponse.create(
                new Error(ReasonPhrases.BAD_REQUEST),
                StatusCodes.BAD_REQUEST,
                "Le premier caractère de createdAt doit être '<' ou '>'"
                );

        if (requestData.updatedAt !== undefined &&
            //typeof data.updatedAt == 'string' &&
            ( requestData.updatedAt.substring(0,1) != '<' && requestData.updatedAt.substring(0,1) != '>' ))
            return ErrorResponse.create(
                new Error(ReasonPhrases.BAD_REQUEST),
                StatusCodes.BAD_REQUEST,
                "Le premier caractère de updatedAt doit être '<' ou '>'"
                );

        const query = QueryBuilder.build(requestData);

        return await this.service.all(query);
    }


    /**
     * @method delete permet d'effectuer une suppression de la fiche d'une entité dans la base de données.
     * Paramètres : 
     *      @param {object} requestData contient le id de l'entité à supprimer.
     * 
     * Retourne : 
     *      @return 
    */
    public async delete(requestData:any):Promise<ApiResponseContract> {
        LogHelper.log("Début de la suppression d'une personne");
        

        const messageUpdate = Validator.validateData(requestData, this.entity.RuleSet("delete"));
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
     *      @param {object} requestData - contient "route":"___" qui spécifie les règles de validation à envoyer selon la route voulue.
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

        const info:any = this.entity.infoChamp;
        info.state = requestData.route;

        const routeRules = this.entity.RuleSet(requestData.route);
        this.entity.infoChamp.champs.forEach(function(value:any){
            //Insère les rules dans le champs
            value.rules = routeRules[value.name];
        });
        return SuccessResponse.create(info, StatusCodes.OK, ReasonPhrases.OK);
    }


}
export default AbstractController;