
import * as mongoose from "mongoose";
import config from "../config";
import LogHelper from "../Monitoring/Helpers/LogHelper";
import {StatusCodes, ReasonPhrases} from "http-status-codes";
import ServiceResponse from "./Responses/ServiceResponse";
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
            }
        }

        try {

            LogHelper.log(this.model, "Get target doc with ", query);

            let item = await this.model.findOne(query);

            return SuccessResponse.create(item, StatusCodes.OK, ReasonPhrases.OK);

            /*return {
                error: false,
                code: StatusCodes.OK,
                message: ReasonPhrases.OK,
                errors: [],
                data: {
                    item
                }
            } as ServiceResponse;*/

        } catch (getAllErrors:any) {

            return ErrorResponse.create(getAllErrors, StatusCodes.INTERNAL_SERVER_ERROR);

            /*return {
                error: true,
                code: StatusCodes.INTERNAL_SERVER_ERROR,
                message: getAllErrors.errmsg || "Not able to get the queried items",
                errors: getAllErrors.errors,
                data: {}
            };*/
        }
    }

    /**
     * Get all the documents from a collection that fits the query.
     * @param query
     */
    async all(query:any):Promise<ServiceResponse> {

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
            }
        }

        try {
            let items = await this.model
                .find(query)
                .skip(skip)
                .limit(limit);
            //let total = await this.model.count();

            //@todo rethink this structure, add a meta data for total, and more ?
            return {
                error: false,
                code: StatusCodes.OK,
                message: ReasonPhrases.OK,
                errors: [],
                data: {
                    items
                }
            } as ServiceResponse;

        } catch (getAllErrors:any) {
            return {
                error: true,
                code: StatusCodes.INTERNAL_SERVER_ERROR,
                message: getAllErrors.errmsg || "Not able to get the queried items",
                errors: getAllErrors.errors,
                data: {}
            } as ServiceResponse;
        }
    }

    /**
     * Insert is the create in CRUD
     * @param data any the document structure. This is type any because that class will be extended.
     */
    async insert(data:any):Promise<ServiceResponse> {
        try {
            let item = await this.model.create(data);
            if (item)
                return {
                    error: false,
                    code: StatusCodes.OK,
                    message: "Ajout de l'item réussi",
                    errors: [],
                    data: {
                        item
                    }
                } as ServiceResponse;
            // if not found, ajouter un arrays vides : users: [];

        } catch (insertError:any) {
            LogHelper.log("Service Error", insertError);
            return {
                error: true,
                code: StatusCodes.INTERNAL_SERVER_ERROR,
                message: insertError.errmsg || "Not able to create item",
                errors: insertError.errors,
                data: {}
            } as ServiceResponse;
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
    async delete(id:string):Promise<ServiceResponse> {
        try {
            let item = await this.model.findByIdAndDelete(id);
            if (!item) {
                return {
                    error: true,
                    code: StatusCodes.NOT_FOUND,
                    message: "item to delete not found",
                    errors:[],
                    data: {}
                };
            }
            return {
                error: false,
                code: StatusCodes.OK,
                message: "Item will be deleted",
                errors:[],
                data: {
                    item
                }
            };
        } catch (deleteError:any) {
            return {
                error: true,
                code: StatusCodes.INTERNAL_SERVER_ERROR,
                message: "Item will be deleted",
                errors: deleteError.errors,
                data: {}
            };
        }
    }

    /**
     * Centralize error to say that the system didn't crash, but we couldn't return something.
     * @private
     * @return ServiceResponse error:False and code NO_CONTENT
     */
    private static errorNothingHappened():ServiceResponse {
        return {
            error: false,
            code: StatusCodes.NO_CONTENT,
            message: "Tried doesn't return nothing and there is no error to catch.",
            errors:[],
            data: {}
        };
    }
}

export default Service;