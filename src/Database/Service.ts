import * as mongoose from "mongoose";
import config from "../config";
import LogHelper from "../Monitoring/Helpers/LogHelper";
import {ReasonPhrases, StatusCodes} from "http-status-codes";
import {SuccessResponse} from "../Http/Responses/SuccessResponse";
import {ErrorResponse} from "../Http/Responses/ErrorResponse";
import type {ApiResponseContract} from "../Http/Responses/ApiResponse";
import AbstractModel from "../Abstract/Model";
import {Obj} from "../Helpers/Obj";
import HttpError from "../Error/HttpError";
import ApiQuery from "@database/QueryBuilder/ApiQuery";

/**
 * Give ability to query and CRUD on collections and its documents.
 * @param model any The model to be use to query in the documents.
 */
export abstract class Service {

    model: any;//@todo create or find the best type for this.
    appModel: AbstractModel;
    //connection: any;
    state: string;

    static CREATE_STATE: string = "create";
    static UPDATE_STATE: string = "update";
    static DELETE_STATE: string = "delete";
    static LIST_STATE: string = "list";
    static SEARCH_STATE: string = "search";
    static UPDATE_OR_CREATE: string = "update or create";
    static CUSTOM_FUNCTION: string = "custom";

    static CREATE_MSG: string = "Création";
    static UPDATE_MSG: string = "Mise à jour";
    static UPDATE_OR_CREATE_MSG: string = "Mise à jour si ça existe sinon on crée";
    static DELETE_MSG: string = "Suppression";
    static LIST_MSG: string = "La liste";
    static SEARCH_MSG: string = "La recherche";

    constructor(model: AbstractModel) {
        this.appModel = model;
    }

    public connectToMongoose(): any {
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
    async get(query: ApiQuery): Promise<ApiResponseContract> {

        try {
            const item = await this.model.findOne(query.transmuted, query.projections, query.options);
            if (item !== null) {
                return SuccessResponse.create(this.appModel.dataTransfertObject(item), StatusCodes.OK, ReasonPhrases.OK);
            }
            return ErrorResponse.create(new Error("La requête n'a pas retourné de résultats"), StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND);

        } catch (getAllErrors: any) {
            return ErrorResponse.create(getAllErrors, StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Get all the documents from a collection that fits the query.
     * @param query
     * @param sorting
     */
    async all(query: ApiQuery): Promise<ApiResponseContract> {
        try {
            const items = await this.model.find(query.transmuted, query.projections, query.options);
            const returnItems = items.map((doc: any) => {
                return this.appModel.dataTransfertObject(doc);
            });

            //populate
            return SuccessResponse.create(
                returnItems,
                StatusCodes.OK,
                ReasonPhrases.OK
            );

        } catch (getAllErrors: any) {
            LogHelper.error(`[${this.constructor.name} all, ${getAllErrors.message}`, getAllErrors.stack);

            return ErrorResponse.create(
                getAllErrors,
                StatusCodes.INTERNAL_SERVER_ERROR,
                getAllErrors.message || "Not able to get the queried items"
            );
        }
    }

    async count(query: any): Promise<ApiResponseContract> {
        if (config.db.config.createObjectIdForQuery) {
            query._id = Service.transformToObjectId(query._id);
            if (query._id.error) {
                return query._id;
            }
        }

        try {
            const items = await this.model.find(query).estimatedDocumentCount();

            //populate
            return SuccessResponse.create(
                items,
                StatusCodes.OK,
                ReasonPhrases.OK
            );

        } catch (getAllErrors: any) {
            LogHelper.error(`[${this.constructor.name} all, ${getAllErrors.message}`, getAllErrors.stack);

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
                    LogHelper.error("Service insert can't create entity", e);
                    const insertError:HttpError = new HttpError("Impossible de créer l'entité.");//suppression de l e.message car l'app renvoie tout.
                    insertError.status = StatusCodes.UNPROCESSABLE_ENTITY;
                    throw insertError;
                });

            return this._parseResult(meta, Service.CREATE_STATE);

        } catch (insertError: any) {
            return this.errorCheck(insertError, Service.UPDATE_STATE);
            /*return ErrorResponse.create(
                insertError.errors,
                StatusCodes.INTERNAL_SERVER_ERROR,
                insertError.message || "Not able to insert item"
            );*/
        }

    }

    /**
     * Insert the persistant data
     * @param data Try to find item, if item != exist, then create it.
     */
    async persistantData(data: any): Promise<ApiResponseContract> {
        const filter = {name: data.name, category: data.category};
        try {
            const meta = this.model.findOneAndUpdate(filter, data, {runValidators: true, upsert: true})
                .catch((e: any) => {
                    const persistantDataError:HttpError = new HttpError(e.message);
                    persistantDataError.status = StatusCodes.UNPROCESSABLE_ENTITY;
                    throw persistantDataError;
                });

            return this._parseResult(meta, Service.UPDATE_STATE);

        } catch (e: any) {
            return this.errorCheck(e, Service.UPDATE_STATE);
        }
    }

    /**
     * With modify the target document.
     * @param data any document data containing id
     * @param options {any} document data containing id
     * @note error 11000 //error = not unique {"index":0,"code":11000,"keyPattern":{"username":1},"keyValue":{"username":"mamilidasdasdasd"}}
     */
    async update(data: any, options?: any): Promise<ApiResponseContract> {
        const updateOptions = {
            new: true,
            runValidators: true,
            //returnOriginal: true,
            ...options
        }

        try {
            const id = data.id;
            delete data.id; //Remove id from data
            // we added validator in front of thesse function. We must assume that this is well formed objectid.
            /*if ((id != undefined && mongoose.isObjectIdOrHexString(id)) || Object.keys(data).length < 1) {
                const
                return ErrorResponse.create(data, StatusCodes.BAD_REQUEST, "id cannot be casted as ObjectId or object to update empty");
            }*/

            // UpdateOne
            const meta = await this.model.findOneAndUpdate({_id: id}, data, updateOptions)
                .catch((e: any) => {
                        const findOneAndUpdateError:HttpError = new HttpError(e.message);
                        findOneAndUpdateError.status = StatusCodes.UNPROCESSABLE_ENTITY;
                        throw findOneAndUpdateError;
                    }
                );

            return this._parseResult(meta, Service.UPDATE_STATE);

        } catch (updateError: any) {

            return this.errorCheck(updateError, Service.UPDATE_STATE);
        }
    }

    async findAndDelete(filter: object) {
        try {
            const meta = await this.model.findOneAndDelete(filter)
                .catch((e: any) => {
                    const findOneAndDeleteError:HttpError = new HttpError(e.message);
                    findOneAndDeleteError.status = StatusCodes.UNPROCESSABLE_ENTITY;
                    throw findOneAndDeleteError;
                });

            return this._parseResult(meta, Service.DELETE_STATE);

        } catch (findAndDeleteError: any) {

            return this.errorCheck(findAndDeleteError, Service.DELETE_STATE);
        }
    }

    /**
     * With modify the target document.
     * @param data any document data containing id
     * @param whereKeys {any} the key to find before insert.
     * @param options {any} document data containing id
     * @note error 11000 //error = not unique {"index":0,"code":11000,"keyPattern":{"username":1},"keyValue":{"username":"mamilidasdasdasd"}}
     */
    async updateOrCreate(data: any, whereKeys?: any, options?: any): Promise<ApiResponseContract> {

        const updateOrCreateOptions = {
            upsert: true,
            new: true,
            runValidators: true,
            ...options
        };

        try {
            const where: any = {};
            switch (typeof whereKeys) {
                case "string":
                    where[whereKeys] = data[whereKeys];
                    break;
                default:
                case "object":
                    for (const whereKey of whereKeys) {
                        where[whereKey] = data[whereKey];
                    }
                    break;
            }

            const meta = await this.model.findOneAndUpdate(where, data, updateOrCreateOptions)
                .catch((e: any) => {
                    // @todo this doesn't catch on CastError, on BSON wrongly pass.
                    const updateOrCreateError:HttpError = new HttpError(e.message);
                    updateOrCreateError.status = StatusCodes.UNPROCESSABLE_ENTITY;
                    throw updateOrCreateError;
                });
            return this._parseResult(meta, Service.UPDATE_OR_CREATE);

        } catch (updateError: any) {
            return this.errorCheck(updateError, Service.UPDATE_OR_CREATE);
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
                    const deleteError:HttpError = new HttpError(e.message);
                    deleteError.status = StatusCodes.UNPROCESSABLE_ENTITY;
                    throw deleteError;
                });

            return this._parseResult(meta, Service.DELETE_STATE);

        } catch (deleteError: any) {

            return this.errorCheck(deleteError, Service.DELETE_STATE);
        }
    }

    /**
     * Call on custom mongoose function on Model.
     * @param mongooseFunction {string} function to call
     * @param params {any} the function params
     */
    async custom(mongooseFunction: string, params?: any): Promise<ApiResponseContract> {
        try {
            const results = await this.model[mongooseFunction](...params)
                .catch((e: any) => {
                        const customError:HttpError = new HttpError(e.message);
                        customError.status = StatusCodes.UNPROCESSABLE_ENTITY;
                        throw customError;
                    }
                );

            return this._parseResult(results, Service.CUSTOM_FUNCTION);

        } catch (errors: any) {

            return this.errorCheck(errors, Service.CUSTOM_FUNCTION);
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

    private _parseResult(meta: any, state: string): ApiResponseContract {
        const actionMessage:string = this._getActionMessageFromState(state);

        if (meta !== null && meta !== undefined) {
            return this.succeedMessage(meta, state);
        }
        return this.errorCheck(meta, state);
    }

    private _getActionMessageFromState(state:string):string {
        switch (state) {
            case Service.CREATE_STATE :
                return Service.CREATE_MSG;
            case Service.UPDATE_STATE :
                return Service.UPDATE_MSG;
            case Service.UPDATE_OR_CREATE :
                return Service.UPDATE_OR_CREATE_MSG;
            case Service.DELETE_STATE :
                return Service.DELETE_MSG;
            case Service.LIST_STATE :
                return Service.LIST_MSG;
            case Service.SEARCH_STATE :
                return Service.SEARCH_MSG;
            default :
                return `L'action : ${state} n'a pas de nom associé (label).`
        }
    }

    public errorCheck(meta: any, state: string): ApiResponseContract {

        const actionMessage:string = this._getActionMessageFromState(state);

        // Mongo DB validation failed, make that excalade the response flow, shall we.
        if (meta.errors) {
            //on create, mongodb validate the data and return an object if errors occurs.
            return ErrorResponse.createWithMultipleErrors(
                meta.errors,
                StatusCodes.BAD_REQUEST,
                "Données non valide. Réajuster la requête.");
        }
        // Mongo DB validation failed, make that excalade the response flow, shall we.
        if (meta.name === "ValidationError") {
            const validationErrors:any = {};

            Object.keys(meta.errors).forEach((key) => {
                validationErrors[key] = meta.errors[key].message;
            });
            //on create, mongodb validate the data and return an object if errors occurs.
            return ErrorResponse.createWithMultipleErrors(
                meta.errors,
                StatusCodes.BAD_REQUEST,
                "Données non valide. Réajuster la requête.");
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

            LogHelper.error("'Service' MongooseError ", StatusCodes.INTERNAL_SERVER_ERROR);

            return ErrorResponse.create({
                    name: "Erreur de service : " + meta.name,
                    message: meta.message
                },
                StatusCodes.INTERNAL_SERVER_ERROR,
                meta.message);
        }


        if (meta.TypeError)
            return ErrorResponse.create(meta, StatusCodes.BAD_REQUEST, "Mauvais type pour " + actionMessage);


        if (Object.keys(meta).length <= 0) {
            return ErrorResponse.create(
                meta,
                StatusCodes.UNPROCESSABLE_ENTITY,
                "Erreur inconnu, Le document de retour est vide, il n'a pas pu être " + actionMessage);
        }

        return ErrorResponse.create(
            meta.errors,
            StatusCodes.UNPROCESSABLE_ENTITY,
            meta.message || `Erreur lors de l'action : ${actionMessage} (code:${meta.code})`
        );
    }

    public succeedMessage(meta: any, state: string): ApiResponseContract {
        const actionMessage:string = this._getActionMessageFromState(state);
        switch (state) {
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
            case Service.UPDATE_OR_CREATE :
                return SuccessResponse.create(meta, StatusCodes.OK, actionMessage + " a réussi");
            default :
                return ErrorResponse.create(meta, StatusCodes.OK, "Succès, mais l'état est indéfini");
        }
    }
}