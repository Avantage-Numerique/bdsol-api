import LogHelper from "../Monitoring/Helpers/LogHelper";
import {ApiResponseContract} from "../Http/Responses/ApiResponse";
import {StatusCodes, ReasonPhrases} from "http-status-codes";
import {ErrorResponse} from "../Http/Responses/ErrorResponse";
import AbstractModel from "./Model";
import { Service } from "../Database/Service";
import QueryBuilder from "../Database/QueryBuilder/QueryBuilder";
import {SuccessResponse} from "../Http/Responses/SuccessResponse";
import UsersHistoryService from "../UserHistory/Services/UsersHistoryService";
import UserHistory from "../UserHistory/Models/UserHistory";
import { UserHistorySchema } from "../UserHistory/Schemas/UserHistorySchema";
import mongoose from "mongoose";

abstract class AbstractController {

    /** @abstract Service of a specific entity */
    abstract service:Service;

    /** @static UserHistory Service */
    static userHistory:UserHistory = UserHistory.getInstance();
    static userHistoryService:UsersHistoryService = UsersHistoryService.getInstance(AbstractController.userHistory);

    /** @abstract Model of a specific entity */
    abstract entity:AbstractModel;

    /**
     * @method create Create a new entity in de database based on the request.
     * @param {any} requestData - Containing information for the create
     * @return {ApiResponseContract} Promise
    */
    public async create(requestData:any):Promise<ApiResponseContract> {
        LogHelper.log("Controller create : ", requestData);
        const createdDocumentResponse = await this.service.insert(requestData);

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
        LogHelper.log("Controller update : ", requestData);
        const updatedModelResponse:any = await this.service.update(requestData);

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
        LogHelper.log("Controller search : ", requestData);
        const query = QueryBuilder.build(requestData);
        return await this.service.get(query);
    }


    /**
     * @method list List entity documents with research terms from database
     * @param {any} requestData - Research terms { "nom":"Jean" }
     * @return {ApiResponseContract} Promise containing a list of documents
    */
    public async list(requestData:any):Promise<ApiResponseContract> {
        LogHelper.log("Controller list : ", requestData);
        const query = QueryBuilder.build(requestData);
        return await this.service.all(query);
    }


    /**
     * @method delete Delete an entity document from the database.
     * @param {any} requestData - contains the id of the document to delete
     * @return {ApiResponseContract} Promise
    */
    public async delete(requestData:any):Promise<ApiResponseContract> {
        LogHelper.log("Controller delete : ", requestData);
        return await this.service.delete(requestData.id);
    }


    /**
     * @method getInfo Obtain information list of rules and attributes for every field of the entity.
     * @param {object} requestData - Contains value "route" which specify the rule set to return with the attributes.
     * @default emptyRoute : Return only the default rule set with all attributes.
     * @return {ApiResponseContract} Promise containing rules and attributes for every field of the entity
    */
    public async getInfo(requestData:any):Promise<ApiResponseContract> {
        LogHelper.log("Controller getInfo : ", requestData);
        const routes = ["create","update","list","search","delete","getinfo"]
        if(!routes.includes(requestData.route)) {
            requestData.route = "default";
        }
        const info:any = this.entity.fieldInfo;
        info.route = requestData.route;

        const routeRules = this.entity.RuleSet(requestData.route);
        this.entity.fieldInfo.field.forEach(function(value:any){
            //Insert rules into each field array 
            value.rules = routeRules[value.name];
        });
        return SuccessResponse.create(info, StatusCodes.OK, ReasonPhrases.OK);
    }

    public async getDoc():Promise<any> {
        LogHelper.log("Route getDoc : ");
        return this.entity.documentation();
    }

    public async createUserHistory(req:any, res:any, response:any, action:string):Promise<boolean> {
        LogHelper.log("Create UserHistory");

        //User id
        const user:mongoose.ObjectId = req.user.id;

        //IP Address
        const ipAddress = "IpAdress Bidon"

        //Modification date
        const modifDate = new Date();

        //Modified entity id
        const modifiedEntity = response._id;

        //Action on the data
        //action <---

        //Set modified fields
        let fields;
        if (action == 'update') {
            fields = this.entity.dataTransfertObject(req.data);
        }
        else {
            fields = response.data;
            delete fields._id;
            delete fields.createdAt;
            delete fields.updatedAt;
            delete fields.__v;
        }

        const history:UserHistorySchema = {
            "user": user,
            "ipAddress": ipAddress,
            "modifDate": modifDate,
            "modifiedEntity": modifiedEntity,
            "action": action,
            "fields": fields,
        } as UserHistorySchema;

        //Service call to add UserHistory
        AbstractController.userHistoryService.insert(history);
        return true;
    }
}
export default AbstractController;