import * as mongoose from "mongoose";
import config from "../config";
import LogHelper from "../Monitoring/Helpers/LogHelper";
import {StatusCodes, ReasonPhrases} from "http-status-codes";
import {SuccessResponse} from "../Http/Responses/SuccessResponse";
import {ErrorResponse} from "../Http/Responses/ErrorResponse";
import type {ApiResponseContract} from "../Http/Responses/ApiResponse";

/**
 * Give ability to query and CRUD on collections and its documents.
 * @param model any The model to be use to query in the documents.
 */
export abstract class Service {

    model: any;//@todo create or find the best type for this.
    connection: any;

    constructor(model: any) {
        this.model = model;
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

        try
        {
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
    async all(query: any): Promise<ApiResponseContract> {

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
            const items = await this.model
                .find(query)
                .skip(skip)
                .limit(limit);

            return SuccessResponse.create(
                items,
                StatusCodes.OK,
                ReasonPhrases.OK
            );

        } catch (getAllErrors: any) {

            return ErrorResponse.create(
                getAllErrors.errors,
                StatusCodes.INTERNAL_SERVER_ERROR,
                getAllErrors.errmsg || "Not able to get the queried items"
            );
        }
    }

    /**
     * Insert is the create in CRUD
     * @param data any the document structure. This is type any because that class will be extended.
     */
    async insert(data: any): Promise<ApiResponseContract> {
        try {
            //let item = await this.model.create(data);
            // UpdateOne
            const meta = await this.model.create(data)
                .then((model: any) => {
                    return model;
                })
                .catch((e: any) => {
                    return e;
                });

            return this.parseResult(meta, 'Création');

        } catch (insertError: any) {

            return ErrorResponse.create(
                insertError.errors,
                StatusCodes.INTERNAL_SERVER_ERROR,
                insertError.errmsg || "Not able to update item"
            );
        }
    }

    /**
     * With modify the target document.
     * @param id string
     * @param data any document data
     * @note error 11000 //error = not unique {"index":0,"code":11000,"keyPattern":{"username":1},"keyValue":{"username":"mamilidasdasdasd"}}
     */
    async update(id: string, data: any): Promise<ApiResponseContract> {

        try {
            // UpdateOne
            const meta = await this.model.updateOne({_id: id}, data, {new: true}).catch((e: any) => {
                LogHelper.info("UpdateOne catch:", e);
                return e;
            });
            LogHelper.info("UpdateOne return after the catch :", meta);
            // if method updateOne fail, it returns a mongo error with a code and a message. // was method findByIdAndUpdate used.

            return this.parseResult(meta, 'Mise à jour');

        } catch (updateError: any) {
            return ErrorResponse.create(
                updateError.errors,
                StatusCodes.INTERNAL_SERVER_ERROR,
                updateError.errmsg || "Not able to update item"
            );
        }
    }


    /**
     * Delete the target document with the target id
     * @param id string of the objectid for the document.
     */
    async delete(id: string): Promise<ApiResponseContract> {

        try {
            const item = await this.model.findByIdAndDelete(id);
            if (!item) {
                return ErrorResponse.create(
                    new Error("item to delete not found"),
                    StatusCodes.NOT_FOUND,
                    "item to delete not found"
                );
            }

            return SuccessResponse.create(
                item,
                StatusCodes.OK,
                "Item will be deleted"
            );

        } catch (deleteError: any) {

            return ErrorResponse.create(
                deleteError.errors,
                StatusCodes.INTERNAL_SERVER_ERROR,
                deleteError.message || "Error on delete item in Service"
            );
        }
    }

    /**
     * Centralize error to say that the system didn't crash, but we couldn't return something.
     * @private
     * @return ApiResponseContract error:False and code NO_CONTENT nor errors
     */
    private static errorNothingHappened(): ApiResponseContract {
        return SuccessResponse.create(
            [],
            StatusCodes.NO_CONTENT,
            "Tried doesn't return nothing and there is no error to catch."
        );
    }

    private static transformToObjectId(id: string): mongoose.Types.ObjectId | ApiResponseContract {
        try {
            return new mongoose.Types.ObjectId(id);
        } catch (error: any) {
            LogHelper.error("not able to generate mongoose id with content", id);
            return ErrorResponse.create(error, StatusCodes.INTERNAL_SERVER_ERROR, "not able to generate mongoose id with content");
        }
    }

    private parseResult(meta: any, actionMessage: string = "Mise à jour"): ApiResponseContract {

        // Champ mal formulé
        if (meta.name === "CastError")
        {
            const field = meta.path + " (" + meta.valueType + "): " + meta.stringValue,
                msg = field + " ne peut pas être casted correctement";

            LogHelper.error(StatusCodes.NOT_ACCEPTABLE + " " + msg);

            return ErrorResponse.create({
                    name: "Erreur de service : " + meta.name,
                    message: meta.message
                },
                StatusCodes.NOT_ACCEPTABLE,
                msg);
        }

        // Si not unique
        if (meta.index === 0) {
            const wrongElements = Object.getOwnPropertyNames(meta.keyValue);
            let wrongElementsValues = "";

            wrongElements.forEach((key: string) => {
                wrongElementsValues += key + " (" + meta.keyValue[key] + ") n'est pas unique";
                LogHelper.warn("WrongElements loop ", key);
            });

            LogHelper.error(StatusCodes.NOT_ACCEPTABLE + " Un élément existe déjà dans la collection : " + wrongElementsValues);
            return ErrorResponse.create({
                    name: "Erreur de service",
                    message: "Un élément existe déjà dans la collection."
                },
                StatusCodes.NOT_ACCEPTABLE,
                wrongElementsValues);
        }

        // RESULTS

        // UPDATE SUCCESSFUL
        if (meta.acknowledged !== undefined &&
            meta.acknowledged)
        {
            LogHelper.log(StatusCodes.OK + " " + actionMessage + " de l'item réussi");
            return SuccessResponse.create(
                meta,
                StatusCodes.OK,
                actionMessage + " de l'item réussi"
            );
        }

        // UPDATE FAILED
        if (meta.acknowledged !== undefined &&
            !meta.acknowledged)
        {
            LogHelper.log(StatusCodes.NOT_MODIFIED + " " + actionMessage + " de l'item n'a pas été réussi");
            return ErrorResponse.create(
                meta,
                StatusCodes.NOT_MODIFIED,
                actionMessage + " de l'item n'a pas été réussi"
            );
        }

        // CREATE SUCCESS //By Default after all the rest ? Not White listing.
        return SuccessResponse.create(
            meta,
            StatusCodes.OK,
            actionMessage + " de l'item réussi"
        );
        //return Service.errorNothingHappened();
    }
}