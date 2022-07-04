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

    /** @abstract Service of a specific entity */
    abstract service:Service;

    /** @abstract Model of a specific entity */
    abstract entity:AbstractModel;

    /** @static Instance of the validator */
    static validator:Validator = new Validator();

    /**
     * @method create Create a new entity in de database based on the request.
     * @param {any} requestData - Containing information for the create
     * @return {ApiResponseContract} Promise
    */
    public async create(requestData:any):Promise<ApiResponseContract> {
        const messageValidate = AbstractController.validator.validateData(requestData, this.entity.RuleSet("create"));
        if (!messageValidate.isValid)
            return ErrorResponse.create(
                new Error(ReasonPhrases.BAD_REQUEST),
                StatusCodes.BAD_REQUEST,
                messageValidate.message
            );

        const formatedData = this.entity.formatRequestDataForDocument(requestData);
        const createdDocumentResponse = await this.service.insert(formatedData);

        if (createdDocumentResponse !== undefined)
            return createdDocumentResponse;

        LogHelper.debug("Service response from insert is undefined");
        return ErrorResponse.create(
            new Error(ReasonPhrases.INTERNAL_SERVER_ERROR),
            StatusCodes.INTERNAL_SERVER_ERROR,
            'Service returned an undefined response from insert'
        );
    }


    /** 
     * @method update Update the attributes of an entity in the database.
     * @param {any} requestData - id and attributs to modify.
     * @return {ApiResponseContract} Promise
     */
    public async update(requestData:any):Promise<ApiResponseContract> {
        const messageUpdate = AbstractController.validator.validateData(requestData, this.entity.RuleSet("update"));
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

        LogHelper.debug("Service response from update is undefined");
        return ErrorResponse.create(
            new Error(ReasonPhrases.INTERNAL_SERVER_ERROR),
            StatusCodes.INTERNAL_SERVER_ERROR,
            'Service returned an undefined response from update'
            );
    
    }

    /**
     * @method search Search for a single entity document with research terms from database.
     * @param {any} requestData - Research terms e.g. { "name":"Jean" }
     * @default emptyRequest : Return the first document.
     * @return {ApiResponseContract} Promise containing search document
    */
    public async search(requestData:any):Promise<ApiResponseContract> {  
        const messageUpdate = AbstractController.validator.validateData(requestData, this.entity.RuleSet("search"), true);
        if (!messageUpdate.isValid)
            return ErrorResponse.create(
                new Error(ReasonPhrases.BAD_REQUEST),
                StatusCodes.BAD_REQUEST,
                messageUpdate.message
            );

        const query = QueryBuilder.build(requestData);
        return await this.service.get(query);
    }


    /**
     * @method list List entity documents with research terms from database
     * @param {any} requestData - Research terms { "nom":"Jean" }
     * @return {ApiResponseContract} Promise containing a list of documents
    */
    public async list(requestData:any):Promise<ApiResponseContract> {
        const messageUpdate = AbstractController.validator.validateData(requestData, this.entity.RuleSet("list"), true);
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
     * @method delete Delete an entity document from the database.
     * @param {any} requestData - contains the id of the document to delete
     * @return {ApiResponseContract} Promise
    */
    public async delete(requestData:any):Promise<ApiResponseContract> {
        const messageUpdate = AbstractController.validator.validateData(requestData, this.entity.RuleSet("delete"));
        if (!messageUpdate.isValid)
            return ErrorResponse.create(
                new Error(ReasonPhrases.BAD_REQUEST),
                StatusCodes.BAD_REQUEST,
                messageUpdate.message
                );
        return await this.service.delete(requestData.id);
    }


    /**
     * @method getInfo Obtain information list of rules and attributes for every field of the entity.
     * @param {object} requestData - Contains value "route" which specify the rule set to return with the attributes.
     * @default emptyRoute : Return only the default rule set with all attributes.
     * @return {ApiResponseContract} Promise containing rules and attributes for every field of the entity
    */
    public async getInfo(requestData:any):Promise<ApiResponseContract> {
        if (typeof requestData === undefined || typeof requestData !== 'object' || Object.keys(requestData).length < 1)
            return ErrorResponse.create(
                new Error(ReasonPhrases.BAD_REQUEST),
                StatusCodes.BAD_REQUEST,
                "La requête n'est pas un objet. "
                );

        const info:any = this.entity.fieldInfo;
        info.route = requestData.route;

        const routeRules = this.entity.RuleSet(requestData.route);
        this.entity.fieldInfo.field.forEach(function(value:any){
            //Insert rules into each field array 
            value.rules = routeRules[value.name];
        });
        return SuccessResponse.create(info, StatusCodes.OK, ReasonPhrases.OK);
    }
}
export default AbstractController;