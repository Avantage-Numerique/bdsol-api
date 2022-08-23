import * as mongoose from "mongoose";
import config from "../config";
import LogHelper from "../Monitoring/Helpers/LogHelper";
import {StatusCodes, ReasonPhrases} from "http-status-codes";
import {SuccessResponse} from "../Http/Responses/SuccessResponse";
import {ErrorResponse} from "../Http/Responses/ErrorResponse";
import type {ApiResponseContract} from "../Http/Responses/ApiResponse";
import AbstractModel from "../Abstract/Model";
import {Obj} from "../Helpers/Obj";

/**
 * Give ability to query and CRUD on collections and its documents.
 * @param model any The model to be use to query in the documents.
 */
export abstract class Service
{

    model: any;//@todo create or find the best type for this.
    appModel: AbstractModel;
    //connection: any;
    state:string;

    static CREATE_STATE:string = "create";
    static UPDATE_STATE:string = "update";
    static DELETE_STATE:string = "delete";
    static LIST_STATE:string = "list";
    static SEARCH_STATE:string = "search";

    static CREATE_MSG:string = "Création";
    static UPDATE_MSG:string = "Mise à jour";
    static DELETE_MSG:string = "Suppression";
    static LIST_MSG:string = "La liste";
    static SEARCH_MSG:string = "La recherche";

    constructor(model: AbstractModel) {
        this.appModel = model;
    }

    public connectToMongoose():any
    {
        if (Obj.isNotNull(this.appModel)) {
            this.model = this.appModel.connect();
            return true;
        }
        return false;
    }

    /**
     * Get all the documents from a collection that fits the query.
     * @param query any Should be an object with the document's
     */
    async get(query: any): Promise<ApiResponseContract>
    {
        if (config.db.config.createObjectIdForQuery) {
            query._id = Service.transformToObjectId(query._id);
            if (query._id.error) {
                return query._id;
            }
        }

        try {
            const item = await this.model.findOne(query);


            if (item !== null) {
                return SuccessResponse.create(item, StatusCodes.OK, ReasonPhrases.OK);
            }

            return ErrorResponse.create(new Error(ReasonPhrases.NOT_FOUND), StatusCodes.NOT_FOUND);

        } catch (getAllErrors: any) {
            return ErrorResponse.create(getAllErrors, StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Get all the documents from a collection that fits the query.
     * @param query
     */
    async all(query: any): Promise<ApiResponseContract>
    {
        //set and dry parameters passed via query, but for preheating purposes.
        let {skip, limit} = query;

        skip = skip ? Number(skip) : config.query.defaultSkip;
        limit = limit ? Number(limit) : config.query.defaultLimit;
        delete query.skip;
        delete query.limit;

        if (config.db.config.createObjectIdForQuery) {
            query._id = Service.transformToObjectId(query._id);
            if (query._id.error) {
                return query._id;
            }
        }

        try {
            const items = await this.model.find(query).skip(skip).limit(limit);

            return SuccessResponse.create(
                items,
                StatusCodes.OK,
                ReasonPhrases.OK
            );

        } catch (getAllErrors: any) {
            LogHelper.error(`[${this.constructor.name} all, ${getAllErrors.message}`);
            return ErrorResponse.create(
                getAllErrors,
                StatusCodes.INTERNAL_SERVER_ERROR,
                getAllErrors.message || "Not able to get the queried items"
            );
        }
    }

    /**
     * Insert is the create in CRUD
     * @param data any the document structure. This is type any because that class will be extended.
     */
    async insert(data: any): Promise<ApiResponseContract> {
        let meta;
        try {
            meta = await this.model.create(data)
             .catch((e: any) => {
                    LogHelper.error("Can't create target Model with data", data, e);
                    return e;
                });

            return this.parseResult(meta, Service.CREATE_STATE);

        } catch (insertError: any) {
            LogHelper.error(insertError);
            return ErrorResponse.create(
                insertError.errors,
                StatusCodes.INTERNAL_SERVER_ERROR,
                insertError.message || "Not able to insert item"
            );
        }

    }

    /**
     * With modify the target document.
     * @param data any document data containing id
     * @note error 11000 //error = not unique {"index":0,"code":11000,"keyPattern":{"username":1},"keyValue":{"username":"mamilidasdasdasd"}}
     */
    async update(data: any): Promise<ApiResponseContract> {

        try {
            const id = data.id;
            delete data.id; //Remove id from data
            
            if( (id != undefined && id.length != 24) || Object.keys(data).length < 1)
                return ErrorResponse.create(data, StatusCodes.BAD_REQUEST, "id cannot be casted as ObjectId or object to update empty");
            

            // UpdateOne
            const meta = await this.model.findOneAndUpdate({_id: id}, data, {new: true, runValidators: true})
                .catch((e: any) => {
                        return e;
                    }
                );

            return this.parseResult(meta, Service.UPDATE_STATE);

        } catch (updateError: any) {
            return ErrorResponse.create(
                updateError.errors,
                StatusCodes.UNPROCESSABLE_ENTITY,
                updateError.errmsg || "Not able to update item or item doesn't exist"
            );
        }
    }

    /**
     * Delete the target document with the target id
     * @param id string of the objectid for the document.
     */
    async delete(id: string): Promise<ApiResponseContract> {

        try {
            const meta = await this.model.findByIdAndDelete(id)
                .catch((e: any) => {
                    LogHelper.info("findByIdAndDelete catch:", e);
                    return e;
                }
            );

            return this.parseResult(meta, Service.DELETE_STATE);

        } catch (deleteError: any) {

            return ErrorResponse.create(
                deleteError.errors,
                StatusCodes.INTERNAL_SERVER_ERROR,
                deleteError.message || "Error on delete item in Service"
            );
        }
    }

    private static transformToObjectId(id: string): mongoose.Types.ObjectId | ApiResponseContract {
        try {
            return new mongoose.Types.ObjectId(id);
        } catch (error: any) {
            LogHelper.error("not able to generate mongoose id with content", id);
            return ErrorResponse.create(error, StatusCodes.INTERNAL_SERVER_ERROR, "not able to generate mongoose id with content");
        }
    }

    private parseResult(meta: any, state:string): ApiResponseContract
    {
        let actionMessage:string;
        switch(state){
            case Service.CREATE_STATE : actionMessage = Service.CREATE_MSG; break;
            case Service.UPDATE_STATE : actionMessage = Service.UPDATE_MSG; break;
            case Service.DELETE_STATE : actionMessage = Service.DELETE_MSG; break;
            case Service.LIST_STATE   : actionMessage = Service.LIST_MSG;   break;
            case Service.SEARCH_STATE : actionMessage = Service.SEARCH_MSG; break;
            default : actionMessage = "State not defined"
        }

        // Mongo DB validation failed, make that excalade the response flow, shall we.
        if (meta.errors) {
            //on create, mongodb validate the data and return an object if errors occurs.
            return ErrorResponse.createWithMultipleErrors(
                meta.errors,
                StatusCodes.BAD_REQUEST,
                "Validating the data fail. Please readjust the request.");
        }

        // Champ mal formulé
        if (meta.name === "CastError") {
            const field = meta.path + " (" + meta.valueType + "): " + meta.stringValue,
                msg = field + " ne peut pas être casted correctement";

            LogHelper.error(StatusCodes.UNPROCESSABLE_ENTITY + " " + msg);

            return ErrorResponse.create({
                    name: "Erreur de service : " + meta.name,
                    message: meta.message
                },
                StatusCodes.UNPROCESSABLE_ENTITY,
                msg);
        }

        // Si not unique
        if (meta.code === 11000) {
            const wrongElements = Object.getOwnPropertyNames(meta.keyValue);
            let wrongElementsValues = "";

            wrongElements.forEach((key: string) => {
                wrongElementsValues += key + " (" + meta.keyValue[key] + ") n'est pas unique";
            });

            //Peut être CONFLICT=409, UNPROCESSABLE_ENTITY=422
            LogHelper.error(StatusCodes.CONFLICT + " Un élément existe déjà dans la collection : " + wrongElementsValues);
            return ErrorResponse.create({
                    name: "Erreur de service",
                    message: "Un élément existe déjà dans la collection."
                },
                StatusCodes.CONFLICT,
                wrongElementsValues);
        }

        // Erreur MongooseError
        if (meta.name === "MongooseError") {

            LogHelper.error(StatusCodes.INTERNAL_SERVER_ERROR);

            return ErrorResponse.create({
                    name: "Erreur de service : " + meta.name,
                    message: meta.message
                },
                StatusCodes.INTERNAL_SERVER_ERROR,
                meta.msg);
        }

        // RESULTS

        // UPDATE SUCCESSFUL
        /*if (meta.acknowledged !== undefined &&
            meta.acknowledged) {
            LogHelper.log(StatusCodes.OK + " " + actionMessage + " de l'item réussi");
            return SuccessResponse.create(
                meta,
                StatusCodes.OK,
                actionMessage + " de l'item réussi"
            );
        }*/

        // UPDATE FAILED
        /*if (meta.acknowledged !== undefined &&
            !meta.acknowledged) {
            LogHelper.log(StatusCodes.NOT_MODIFIED + " " + actionMessage + " de l'item n'a pas été réussi");
            return ErrorResponse.create(
                meta,
                StatusCodes.NOT_MODIFIED,
                actionMessage + " de l'item n'a pas été réussi"
            );
        }*/

        if(meta.TypeError)
            return ErrorResponse.create(meta, StatusCodes.BAD_REQUEST, "Échec de la " + actionMessage)

        switch(state){
            case Service.CREATE_STATE :
                return SuccessResponse.create(meta, StatusCodes.CREATED, actionMessage + " de l'item réussi");
            case Service.UPDATE_STATE :
                return SuccessResponse.create(meta, StatusCodes.OK, actionMessage + " de l'item réussi");
            case Service.DELETE_STATE :
                return SuccessResponse.create(meta, StatusCodes.OK, actionMessage + " de l'item réussi");
            case Service.LIST_STATE   :
                return SuccessResponse.create(meta, StatusCodes.OK, actionMessage + " a réussi");
            case Service.SEARCH_STATE :
                return SuccessResponse.create(meta, StatusCodes.OK, actionMessage + " a réussi");
            default : return ErrorResponse.create(meta, StatusCodes.INTERNAL_SERVER_ERROR, "Le state dans service n'est pas défini...");
        }
    }
}