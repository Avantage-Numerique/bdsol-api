
import * as mongoose from "mongoose";
import config from "../config";
import LogHelper from "../Monitoring/Helpers/LogHelper";


/**
 * Give abality to query and CRUD on collections and its document.
 * @param model any The
 */
class Service {

    model: any;//@todo create or find the best type for that.

    constructor(model: any) {
        this.model = model;
        /*this.getAll = this.getAll.bind(this);
        this.insert = this.insert.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);*/
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
                code: 500,
                message: getAllErrors.errmsg || "Not able to get the queried items",
                errors: getAllErrors.errors
            };
        }
    }

    /**
     * Get all the documents from a collection that fits the query.
     * @param query
     */
    async getAll(query:any) {

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
            let total = await this.model.count();

            //@todo rethink this structure, add a meta data for total, and more ?
            return {
                error: false,
                code: 200,
                data: items,
                total
            };
        } catch (getAllErrors:any) {
            return {
                error: true,
                code: 500,
                message: getAllErrors.errmsg || "Not able to get the queried items",
                errors: getAllErrors.errors
            };
        }
    }

    /**
     * Inset is the create in CRUD
     * @param data any the document structure. This is type any because that class will be extended.
     */
    async insert(data:any) {
        try {
            let item = await this.model.create(data);
            if (item)
                return {
                    error: false,
                    item
                };
        } catch (insertError:any) {
            LogHelper.log("Service Error", insertError);
            return {
                error: true,
                code: 500,
                message: insertError.errmsg || "Not able to create item",
                errors: insertError.errors
            };
        }
    }

    /**
     * With modify the target document.
     * @param id string
     * @param data any document data
     */
    async update(id:string, data:any) {
        try {
            let item = await this.model.findByIdAndUpdate(id, data, {new: true});
            return {
                error: false,
                code: 202,
                item
            };
        } catch (updateError:any) {
            return {
                error: true,
                code: 500,
                message: updateError.errmsg || "Not able to update item",
                errors: updateError.errors
            };
        }
    }


    async delete(id:string) {
        try {
            let item = await this.model.findByIdAndDelete(id);
            if (!item) {
                return {
                    error: true,
                    code: 404,
                    message: "item not found"
                };
            }
            return {
                error: false,
                deleted: true,
                code: 202,
                item
            };
        } catch (deleteError:any) {
            return {
                error: true,
                code: 500,
                deleteError
            };
        }
    }
}

export default Service;