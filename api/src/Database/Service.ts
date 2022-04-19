
import * as mongoose from "mongoose";
import config from "../config";
import LogHelper from "../Monitoring/Helpers/LogHelper";
import {StatusCodes, ReasonPhrases} from "http-status-codes";
import ServiceResponse from "./Responses/ServiceResponse";


/**
 * Give abality to query and CRUD on collections and its document.
 * @param model any The
 */
class Service {

    model: any;//@todo create or find the best type for this.
    connection:any;

    constructor(model: any) {
        this.model = model;
    }

    /**
     * Get all the documents from a collection that fits the query.
     * @param query
     */
    async get(query:any) {

        if (query._id) {
            try {
                query._id = new mongoose.mongo.ObjectId(query._id);
            } catch (error:any) {
                LogHelper.log("not able to generate mongoose id with content", query._id);
            }
        }

        try {

            LogHelper.log(this.model, "Get target doc with ", query);
            return await this.model.findOne(query);

        } catch (getAllErrors:any) {
            return {
                error: true,
                code: StatusCodes.INTERNAL_SERVER_ERROR,
                message: getAllErrors.errmsg || "Not able to get the queried items",
                errors: getAllErrors.errors
            };
        }
    }

    /**
     * Get all the documents from a collection that fits the query.
     * @param query
     */
    async all(query:any) {

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
                    code: StatusCodes.ACCEPTED,
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
     */
    async update(id:string, data:any):Promise<ServiceResponse> {

        try {
            let item = await this.model.findByIdAndUpdate(id, data, {new: true});
            if (item)
                return {
                    error: false,
                    code: StatusCodes.ACCEPTED,
                    message: "Mise à jour de l'item réussi",
                    errors:[],
                    data: {
                        item
                    }
                } as ServiceResponse;

        } catch (updateError:any) {
            return {
                error: true,
                code: StatusCodes.INTERNAL_SERVER_ERROR,
                message: updateError.errmsg || "Not able to update item",
                errors: updateError.errors,
                data: {}
            } as ServiceResponse;
        }

        return Service.errorNothingHappened();
    }


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
                code: StatusCodes.ACCEPTED,
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