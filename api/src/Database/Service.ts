
import * as mongoose from "mongoose";
import config from "../config";
import LogHelper from "../Monitoring/Helpers/LogHelper";
import {StatusCodes, ReasonPhrases} from "http-status-codes";
import {SuccessResponse} from "../Http/Responses/SuccessResponse";
import {ErrorResponse} from "../Http/Responses/ErrorResponse";
import {ApiResponseContract} from "../Http/Responses/ApiResponse";


/**
 * Give ability to query and CRUD on collections and its documents.
 * @param model any The model to be use to query in the documents.
 */
class Service {

    model: any;//@todo create or find the best type for this.
    connection:any;

    constructor(model: any) {
        this.model = model;
    }

    /**
     * Get all the documents from a collection that fits the query.
     * @param query any Should be an object with the document's
     */
    async get(query:any):Promise<ApiResponseContract> {

        if (query._id) {
            try {
                query._id = new mongoose.mongo.ObjectId(query._id);
            } catch (error:any) {
                LogHelper.log("not able to generate mongoose id with content", query._id);
                return ErrorResponse.create(error, StatusCodes.INTERNAL_SERVER_ERROR, "not able to generate mongoose id with content");
            }
        }

        try {
            LogHelper.log(this.model, "Get target doc with ", query);
            let item = await this.model.findOne(query);

            return SuccessResponse.create(item, StatusCodes.OK, ReasonPhrases.OK);

        } catch (getAllErrors:any) {
            return ErrorResponse.create(getAllErrors, StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Get all the documents from a collection that fits the query.
     * @param query
     */
    async all(query:any):Promise<ApiResponseContract> {

        //set and dry parameters passed via query, but for preheating purposes.
        let {skip, limit} = query;

        skip = skip ? Number(skip) : config.query.defaultSkip;
        limit = limit ? Number(limit) : config.query.defaultLimit;
        delete query.skip;
        delete query.limit;

        if (query._id) {
            try {
                query._id = new mongoose.mongo.ObjectId(query._id);
            } catch (error:any) {
                LogHelper.log("not able to generate mongoose id with content", query._id);
                return ErrorResponse.create(
                    error.errors,
                    StatusCodes.INTERNAL_SERVER_ERROR,
                    error.errmsg || "not able to generate mongoose id with content"
                );
            }
        }

        try {
            let items = await this.model
                .find(query)
                .skip(skip)
                .limit(limit);

            return SuccessResponse.create(
                items,
                StatusCodes.OK,
                ReasonPhrases.OK
            );

        } catch (getAllErrors:any) {

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
    async insert(data:any):Promise<ApiResponseContract> {
        try {
            let item = await this.model.create(data);
            if (item) {
                return SuccessResponse.create(
                    item,
                    StatusCodes.OK,
                    "Ajout de l'item réussi"
                );
            }

        } catch (insertError:any) {

            return ErrorResponse.create(
                insertError.errors,
                StatusCodes.INTERNAL_SERVER_ERROR,
                insertError.errmsg || "Not able to update item"
            );
        }

        return Service.errorNothingHappened();
    }

    /**
     * With modify the target document.
     * @param id string
     * @param data any document data
     * @note error 11000 //error = not unique {"index":0,"code":11000,"keyPattern":{"username":1},"keyValue":{"username":"mamilidasdasdasd"}}
     */
    async update(id:string, data:any):Promise<ApiResponseContract> {

        try {
            // UpdateOne
            let meta = await this.model.updateOne({_id: id }, data, {new:true}).catch((e:any) => {
                LogHelper.info("UpdateOne catch:", e);
                return e;
            });

            // if method findByIdAndUpdate fail, it returns a mongo error with a code and a message.
            if (meta.index === 0) {

                let wrongElements = Object.getOwnPropertyNames(meta.keyValue),
                    wrongElementsValues = "";

                wrongElements.forEach((key:string) => {
                    wrongElementsValues += key + " (" + meta.keyValue[key] + ") n'est pas unique";
                    LogHelper.warn("WrongElements loop ", key);
                });

                return ErrorResponse.create({
                        name: "Erreur de service",
                        message: "Un élément existe déjà dans la collection."
                    },
                    StatusCodes.NOT_ACCEPTABLE,
                    wrongElementsValues);
            }

            if (meta) {
                return SuccessResponse.create(
                    meta,
                    StatusCodes.OK,
                    "Mise à jour de l'item réussi"
                );
            }

        } catch (updateError:any) {
            return ErrorResponse.create(
                updateError.errors,
                StatusCodes.INTERNAL_SERVER_ERROR,
                updateError.errmsg || "Not able to update item"
            );
        }

        return Service.errorNothingHappened();
    }



    /**
     * Delete the target document with the target id
     * @param id string of the objectid for the document.
     */
    async delete(id:string):Promise<ApiResponseContract> {

        try {
            let item = await this.model.findByIdAndDelete(id);
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

        } catch (deleteError:any) {

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
    private static errorNothingHappened():ApiResponseContract {
        return SuccessResponse.create(
            [],
            StatusCodes.NO_CONTENT,
            "Tried doesn't return nothing and there is no error to catch."
        );
    }
}

export default Service;