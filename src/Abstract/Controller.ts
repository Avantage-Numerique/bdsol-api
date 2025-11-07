import { ApiResponseContract } from "../Http/Responses/ApiResponse";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { ErrorResponse } from "../Http/Responses/ErrorResponse";
import AbstractModel from "./Model";
import { Service } from "@database/Service";
import QueryBuilder from "@database/QueryBuilder/QueryBuilder";
import { SuccessResponse } from "@src/Http/Responses/SuccessResponse";
import UsersHistoryService from "@src/UserHistory/Services/UsersHistoryService";
import UserHistory from "@src/UserHistory/Models/UserHistory";
import { UserHistorySchema } from "@src/UserHistory/Schemas/UserHistorySchema";
import { ControllerContract } from "./Contracts/ControllerContract";
import ApiQuery from "@database/QueryBuilder/ApiQuery";
import LogHelper from "@src/Monitoring/Helpers/LogHelper";

/**
 * AbstractController
 * Endpoint method for target entity that handle : create, update, delete, list, search, getInfo and getDoc.
 */
abstract class AbstractController implements ControllerContract {
    /** @abstract Service of a specific entity */
    abstract service: Service;

    /** @abstract Model of a specific entity */
    abstract entity: AbstractModel;

    /**
     * @method create Create a new entity in the database based on the request.
     * @param {any} reqBody - Containing information for the create
     * @return {ApiResponseContract} Promise
     */
    public async create(reqBody: any): Promise<ApiResponseContract> {
        const createdDocumentResponse = await this.service.insert(reqBody.data);

        if (createdDocumentResponse !== undefined) return createdDocumentResponse;

        return ErrorResponse.create(
            new Error(ReasonPhrases.INTERNAL_SERVER_ERROR),
            StatusCodes.INTERNAL_SERVER_ERROR,
            "Service returned an undefined response from insert"
        );
    }

    /**
     * @method update Update the attributes of an entity in the database.
     * @param {any} reqBody - id and attributs to modify.
     * @return {ApiResponseContract} Promise
     */
    public async update(reqBody: any): Promise<ApiResponseContract> {
        const updatedModelResponse: any = await this.service.update(reqBody.data);
        if (updatedModelResponse !== undefined) return updatedModelResponse;

        return ErrorResponse.create(
            new Error(ReasonPhrases.INTERNAL_SERVER_ERROR),
            StatusCodes.INTERNAL_SERVER_ERROR,
            "Service returned an undefined response from update"
        );
    }

    public async textSearch(reqBody: any): Promise<ApiResponseContract> {
        const apiQuery: ApiQuery = new ApiQuery({
            $text: { $search: reqBody.data.searchIndex },
        });
        apiQuery.options = {
            sort: { score: -1 },
        };
        return await this.service.all(apiQuery);
    }

    /**
     * @method search Search for a single entity document with research terms from database.
     * @param {any} reqBody - Research terms e.g. { "name":"Jean" }
     * @default emptyRequest : Return the first document.
     * @return {ApiResponseContract} Promise containing search document
     */
    public async search(reqBody: any): Promise<ApiResponseContract> {
        const query = QueryBuilder.build(reqBody.data, true);
        return await this.service.get(query);
    }

    /**
     * @method get get target entity by
     * @param {any} reqBody - Research terms { "nom":"Jean" }
     * @return {ApiResponseContract} Promise containing a list of documents
     */
    public async get(reqBody: any): Promise<ApiResponseContract> {
        const query = QueryBuilder.build(reqBody.data, true);
        return await this.service.get(query);
    }

    /**
     * @method single get target single entity
     * @param {any} reqBody - Research terms { "nom":"Jean" }
     * @return {ApiResponseContract} Promise containing a list of documents
     */
    public async single(reqBody: any): Promise<ApiResponseContract> {
        return this.get(reqBody.data);
    }

    /**
     * @method list List entity documents with research terms from database
     * @param {any} reqBody - Research terms { "nom":"Jean" }
     * @param {any} params - Research terms { "nom":"Jean" }
     * @return {ApiResponseContract} Promise containing a list of documents
     */
    public async getBy(params: string, reqBody: any): Promise<ApiResponseContract> {
        const query = QueryBuilder.build(reqBody.data, true);
        return await this.service.get(query);
    }

    /**
     * @method list List entity documents with research terms from database
     * @param {any} reqBody - Research terms { "nom":"Jean" }
     * @return {ApiResponseContract} Promise containing a list of documents
     */
    public async list(reqBody: any): Promise<ApiResponseContract> {
        const query = QueryBuilder.build(reqBody.data, true);
        return await this.service.all(query);
    }

    public async count(reqBody: any): Promise<ApiResponseContract> {
        const query = QueryBuilder.build(reqBody.data);
        return await this.service.count(query);
    }

    /**
     * @method delete Delete an entity document from the database.
     * @param {any} reqBody - contains the id of the document to delete
     * @return {ApiResponseContract} Promise
     */
    public async delete(reqBody: any): Promise<ApiResponseContract> {
        return await this.service.delete(reqBody.data.id);
    }

    /**
     * @method getInfo Obtain information list of rules and attributes for every field of the entity.
     * @param {object} reqBody - Contains value "route" which specify the rule set to return with the attributes.
     * @default emptyRoute : Return only the default rule set with all attributes.
     * @return {ApiResponseContract} Promise containing rules and attributes for every field of the entity
     */
    public async getInfo(reqBody: any): Promise<ApiResponseContract> {
        const routes = ["create", "update", "list", "search", "delete", "getinfo"];
        if (!routes.includes(reqBody.data.route)) {
            reqBody.data.route = "default";
        }
        const info: any = this.entity.fieldInfo;
        info.route = reqBody.data.route;

        const routeRules = this.entity.RuleSet(reqBody.data.route);
        this.entity.fieldInfo.field.forEach(function (value: any) {
            //Insert rules into each field array
            value.rules = routeRules[value.name];
        });
        return SuccessResponse.create(info, StatusCodes.OK, ReasonPhrases.OK);
    }

    public async getDoc(): Promise<any> {
        return this.entity.documentation();
    }

    public async createUserHistory(req: any, res: any): Promise<ApiResponseContract> {
        const userHistoryService: UsersHistoryService = UsersHistoryService.getInstance(UserHistory.getInstance());
        const response: any = res.serviceResponse;
        const action: string = res.serviceResponse.action;
        try {
            //User id
            const user: any = req.user?._id;

            //IP Address
            const ipAddress = req.visitor.ip;
            const fromAppIp = req.ip;

            //Modification date
            const modifDate = new Date();

            //Affected database
            const entityCollection = req.originalUrl.split("/")[1]; //split every '/' --> [ "" / "organisations" / "create" ]

            //Modified entity id
            const modifiedEntity = response.data?._id;

            //Action on the data
            //action <---

            //Set modified fields
            const fields = response.data;

            //Media
            const media = response.media ?? {};
            LogHelper.log(
                "---- USER HISTORY ----",
                "FROM APP IP",
                fromAppIp,
                "FROM VISITOR IP",
                ipAddress,
                "USER",
                user
            );
            const history: UserHistorySchema = {
                user: user,
                ipAddress: ipAddress,
                modifDate: modifDate,
                action: action,
                entityCollection: entityCollection,
                modifiedEntity: modifiedEntity,
                fields: this.entity.dataTransfertObject(fields),
            } as UserHistorySchema;

            //Service call to add UserHistory
            return await userHistoryService.insert(history);
        } catch (e: any) {
            return ErrorResponse.create(
                e,
                StatusCodes.INTERNAL_SERVER_ERROR,
                "Can't create the user history due to an error."
            );
        }
    }
}

export default AbstractController;
