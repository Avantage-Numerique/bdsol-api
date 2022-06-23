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

    public responseReturn(status:ApiResponseContract, res:any){
        const response = status;
        return res.status(response.code).send(response);
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
    public async create(req:any, res:any):Promise<ApiResponseContract> {

        const {data} = req.body;
        const messageValidate = Validator.validateData(data, this.entity.RuleSet("create"));
        if (!messageValidate.isValid)
            return this.responseReturn(ErrorResponse.create(
                new Error(ReasonPhrases.BAD_REQUEST),
                StatusCodes.BAD_REQUEST,
                messageValidate.message
                ), res);

        //Can I just :  formatedData = {requestData}:Xschema
        const formatedData = this.entity.formatRequestDataForDocument(data);
        const createdDocumentResponse = await this.service.insert(formatedData);
        
        if (createdDocumentResponse !== undefined)
            return this.responseReturn(createdDocumentResponse,res);

        LogHelper.debug("Le code manque de robustesse. Entity/create");
        return this.responseReturn(ErrorResponse.create(
            new Error(ReasonPhrases.INTERNAL_SERVER_ERROR),
            StatusCodes.INTERNAL_SERVER_ERROR,
            'Les données semblent être ok, mais la création n\'a pas eu lieu.'
            ),res);
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
    public async update(req:any, res:any):Promise<ApiResponseContract> {
        const {data} = req.body;
        //Validation des données
        const messageUpdate = Validator.validateData(data, this.entity.RuleSet("update"));
        if (!messageUpdate.isValid)
            return this.responseReturn(ErrorResponse.create(
                new Error(ReasonPhrases.BAD_REQUEST),
                StatusCodes.BAD_REQUEST,
                messageUpdate.message
                ),res);

        const formatedData = this.entity.formatRequestDataForDocument(data);
        const updatedModelResponse:any = await this.service.update(data.id, formatedData);

        if (updatedModelResponse !== undefined)
            return this.responseReturn(updatedModelResponse, res);

        LogHelper.debug("Le code manque de robustesse. Personnes/update");
        return this.responseReturn(ErrorResponse.create(
            new Error(ReasonPhrases.INTERNAL_SERVER_ERROR),
            StatusCodes.INTERNAL_SERVER_ERROR,
            'Les données semblent être ok, mais la mise à jour n\'a pas eu lieu.'
            ),res);
    
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
    public async search(req:any, res:any):Promise<ApiResponseContract> {
        LogHelper.log("Début de la recherche dans la liste");
        const {data} = req.body;

        const messageUpdate = Validator.validateData(data, this.entity.RuleSet("search"));
        if (!messageUpdate.isValid)
            return this.responseReturn(ErrorResponse.create(
                new Error(ReasonPhrases.BAD_REQUEST),
                StatusCodes.BAD_REQUEST,
                messageUpdate.message
            ),res);

        //Validation date
        if (data.createdAt !== undefined &&
            //typeof data.createdAt == 'string' &&
            ( data.createdAt.substring(0,1) != '<' && data.createdAt.substring(0,1) != '>' ))
            return this.responseReturn(ErrorResponse.create(
                new Error(ReasonPhrases.BAD_REQUEST),
                StatusCodes.BAD_REQUEST,
                "Le premier caractère de createdAt doit être '<' ou '>'"
                ),res);

        if (data.updatedAt !== undefined &&
            //typeof data.updatedAt == 'string' &&
            ( data.updatedAt.substring(0,1) != '<' && data.updatedAt.substring(0,1) != '>' ))
            return this.responseReturn(ErrorResponse.create(
                new Error(ReasonPhrases.BAD_REQUEST),
                StatusCodes.BAD_REQUEST,
                "Le premier caractère de updatedAt doit être '<' ou '>'"
                ),res);

        const query = QueryBuilder.build(data);

        const response = await this.service.get(query);
        return this.responseReturn(response, res);
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
    public async list(req:any, res:any):Promise<ApiResponseContract> {
        LogHelper.log("Début de la requête d'obtention de la liste de personne");
        const {data} = req.body;

        const messageUpdate = Validator.validateData(data, this.entity.RuleSet("list"));
        if (!messageUpdate.isValid)
            return this.responseReturn(ErrorResponse.create(
                new Error(ReasonPhrases.BAD_REQUEST),
                StatusCodes.BAD_REQUEST,
                messageUpdate.message
                ),res);

        //Validation date
        if (data.createdAt !== undefined &&
            //typeof data.createdAt == 'string' &&
            ( data.createdAt.substring(0,1) != '<' && data.createdAt.substring(0,1) != '>' ))
            return this.responseReturn(ErrorResponse.create(
                new Error(ReasonPhrases.BAD_REQUEST),
                StatusCodes.BAD_REQUEST,
                "Le premier caractère de createdAt doit être '<' ou '>'"
                ),res);

        if (data.updatedAt !== undefined &&
            //typeof data.updatedAt == 'string' &&
            ( data.updatedAt.substring(0,1) != '<' && data.updatedAt.substring(0,1) != '>' ))
            return this.responseReturn(ErrorResponse.create(
                new Error(ReasonPhrases.BAD_REQUEST),
                StatusCodes.BAD_REQUEST,
                "Le premier caractère de updatedAt doit être '<' ou '>'"
                ),res);

        const query = QueryBuilder.build(data);

        const response = await this.service.all(query);
        return res.status(response.code).send(response);
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
    public async delete(req:any, res:any):Promise<ApiResponseContract> {
        LogHelper.log("Début de la suppression d'une personne");
        const {data} = req.body;

        const messageUpdate = Validator.validateData(data, this.entity.RuleSet("delete"));
        if (!messageUpdate.isValid)
            return ErrorResponse.create(
                new Error(ReasonPhrases.BAD_REQUEST),
                StatusCodes.BAD_REQUEST,
                messageUpdate.message
                );
        const response = await this.service.delete(data.id);
        return res.status(response.code).send(response);
    }


    /**
     * @method getInfo renvoi la liste des informations des champs de l'entité et les règle de validation de chaque champs.
     * Paramètres : 
     *      @param {object} requestData - contient "route" qui spécifie le retour des règles approprié
     * 
     * Retourne : 
     *      @return 
    */
    public async getInfo(req:any, res:any):Promise<ApiResponseContract> {
        LogHelper.log("Début de la création des informations du champs");
        const {data} = req.body;
        
        if (typeof data === undefined || typeof data !== 'object' || Object.keys(data).length < 1)
            return this.responseReturn(ErrorResponse.create(
                new Error(ReasonPhrases.BAD_REQUEST),
                StatusCodes.BAD_REQUEST,
                "La requête n'est pas un objet. "
                ),res);

        const info:any = this.entity.infoChamp;
        info.state = data.route;

        const routeRules = this.entity.RuleSet(data.route);
        this.entity.infoChamp.champs.forEach(function(value:any){
            //Insère les rules dans le champs
            value.rules = routeRules[value.name];
        });
        return this.responseReturn(SuccessResponse.create(info, StatusCodes.OK, ReasonPhrases.OK),res);
    }


}
export default AbstractController;