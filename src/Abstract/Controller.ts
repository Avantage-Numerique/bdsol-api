import {ApiResponseContract} from "../Http/Responses/ApiResponse";
import {StatusCodes, ReasonPhrases} from "http-status-codes";
import {ErrorResponse} from "../Http/Responses/ErrorResponse";
import AbstractModel from "./Model";
import {Service} from "../Database/Service";
import QueryBuilder from "../Database/QueryBuilder/QueryBuilder";
import {SuccessResponse} from "../Http/Responses/SuccessResponse";
import UsersHistoryService from "../UserHistory/Services/UsersHistoryService";
import UserHistory from "../UserHistory/Models/UserHistory";
import {UserHistorySchema} from "../UserHistory/Schemas/UserHistorySchema";
import {ControllerContract} from "./Contracts/ControllerContract";

/**
 * AbstractController
 * Endpoint method for target entity that handle : create, update, delete, list, search, getInfo and getDoc.
 */
abstract class AbstractController implements ControllerContract {

    /** @abstract Service of a specific entity */
    abstract service: Service;

    abstract name: string;

    /** @abstract Model of a specific entity */
    abstract entity: AbstractModel;

    /**
     * @method create Create a new entity in de database based on the request.
     * @param {any} requestData - Containing information for the create
     * @return {ApiResponseContract} Promise
     */
    public async create(requestData: any): Promise<ApiResponseContract> {
        const createdDocumentResponse = await this.service.insert(requestData);

        if (createdDocumentResponse !== undefined)
            return createdDocumentResponse;

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
    public async update(requestData: any): Promise<ApiResponseContract> {
        const updatedModelResponse: any = await this.service.update(requestData);

        if (updatedModelResponse !== undefined)
            return updatedModelResponse;

        return ErrorResponse.create(
            new Error(ReasonPhrases.INTERNAL_SERVER_ERROR),
            StatusCodes.INTERNAL_SERVER_ERROR,
            'Service returned an undefined response from update'
        );
    }

    public async textSearch(requestData:any): Promise<ApiResponseContract> {
        const query = { $text: { $search: requestData.searchIndex }};
        const score = { score: { $meta: "textScore" }};
        const sort = { score: {$meta: "textScore"} };
        return await this.service.all(query);
    }

    /**
     * @method search Search for a single entity document with research terms from database.
     * @param {any} requestData - Research terms e.g. { "name":"Jean" }
     * @default emptyRequest : Return the first document.
     * @return {ApiResponseContract} Promise containing search document
     */
    public async search(requestData: any): Promise<ApiResponseContract> {
        const query = QueryBuilder.build(requestData);
        return await this.service.get(query);
    }


    /**
     * @method list List entity documents with research terms from database
     * @param {any} requestData - Research terms { "nom":"Jean" }
     * @return {ApiResponseContract} Promise containing a list of documents
     */
    public async get(requestData: any): Promise<ApiResponseContract> {
        const query = QueryBuilder.build(requestData);
        return await this.service.get(query);
    }


    /**
     * @method list List entity documents with research terms from database
     * @param {any} requestData - Research terms { "nom":"Jean" }
     * @param {any} params - Research terms { "nom":"Jean" }
     * @return {ApiResponseContract} Promise containing a list of documents
     */
    public async getBy(params:string, requestData: any): Promise<ApiResponseContract> {
        const query = QueryBuilder.build(requestData);
        return await this.service.get(query);
    }


    /**
     * @method list List entity documents with research terms from database
     * @param {any} requestData - Research terms { "nom":"Jean" }
     * @return {ApiResponseContract} Promise containing a list of documents
     */
    public async list(requestData: any): Promise<ApiResponseContract> {
        const query = QueryBuilder.build(requestData);
        return await this.service.all(query);
    }


    /**
     * @method delete Delete an entity document from the database.
     * @param {any} requestData - contains the id of the document to delete
     * @return {ApiResponseContract} Promise
     */
    public async delete(requestData: any): Promise<ApiResponseContract> {
        return await this.service.delete(requestData.id);
    }


    /**
     * @method getInfo Obtain information list of rules and attributes for every field of the entity.
     * @param {object} requestData - Contains value "route" which specify the rule set to return with the attributes.
     * @default emptyRoute : Return only the default rule set with all attributes.
     * @return {ApiResponseContract} Promise containing rules and attributes for every field of the entity
     */
    public async getInfo(requestData: any): Promise<ApiResponseContract> {
        const routes = ["create", "update", "list", "search", "delete", "getinfo"]
        if (!routes.includes(requestData.route)) {
            requestData.route = "default";
        }
        const info: any = this.entity.fieldInfo;
        info.route = requestData.route;

        const routeRules = this.entity.RuleSet(requestData.route);
        this.entity.fieldInfo.field.forEach(function (value: any) {
            //Insert rules into each field array 
            value.rules = routeRules[value.name];
        });
        return SuccessResponse.create(info, StatusCodes.OK, ReasonPhrases.OK);
    }


    public async getDoc(): Promise<any> {
        return this.entity.documentation();
    }


    public async createUserHistory(req: any, res: any, response: any, action: string): Promise<boolean> {
        const userHistoryService: UsersHistoryService = UsersHistoryService.getInstance(UserHistory.getInstance());

        //User id
        const user: any = req.user._id;

        //IP Address
        const ipAddress = req.visitor.ip;
        const fromAppIp = req.ip;

        //Modification date
        const modifDate = new Date();

        //Affected database
        const entityCollection = req.originalUrl.split("/")[1]; //split every '/' --> [ "" / "organisations" / "create" ]

        //Modified entity id
        const modifiedEntity = response.data._id;

        //Action on the data
        //action <---

        //Set modified fields
        const fields = response.data;

        //Media
        console.log(response);
        const media = response.media ?? {}
        console.log("media", media);
        console.log("media.data", media.data)

        const history: UserHistorySchema = {
            "user": user,
            "ipAddress": ipAddress,
            "modifDate": modifDate,
            "action": action,
            "entityCollection": entityCollection,
            "modifiedEntity": modifiedEntity,
            "fields": this.entity.dataTransfertObject(fields),
            "media": media.data ?? {}
        } as UserHistorySchema;

        //Service call to add UserHistory
        userHistoryService.insert(history);
        return true;
    }
}

export default AbstractController;