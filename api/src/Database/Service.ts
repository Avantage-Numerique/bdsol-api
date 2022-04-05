
import * as mongoose from "mongoose";
import config from "../config";
import LogHelper from "../Monitoring/Helpers/LogHelper";



class Service {

    model: any;//@todo create of find the best model type for that.

    constructor(model: any) {
        this.model = model;
        this.getAll = this.getAll.bind(this);
        this.insert = this.insert.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    async getAll(query:any) {
        let {skip, limit} = query;

        skip = skip ? Number(skip) : config.query.defaultSkip;
        limit = limit ? Number(limit) : config.query.defaultLimit;

        delete query.skip;
        delete query.limit;

        if (query._id) {
            try {
                query._id = new mongoose.mongo.ObjectId(query._id);
            } catch (error:any) {
                console.log("not able to generate mongoose id with content", query._id);
            }
        }

        try {
            let items = await this.model
                .find(query)
                .skip(skip)
                .limit(limit);
            let total = await this.model.count();

            return {
                error: false,
                statusCode: 200,
                data: items,
                total
            };
        } catch (getAllErrors:any) {
            return {
                error: true,
                statusCode: 500,
                getAllErrors
            };
        }
    }

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
                statusCode: 500,
                message: insertError.errmsg || "Not able to create item",
                errors: insertError.errors
            };
        }
    }

    async update(id:string, data:any) {
        try {
            let item = await this.model.findByIdAndUpdate(id, data, {new: true});
            return {
                error: false,
                statusCode: 202,
                item
            };
        } catch (updateError:any) {
            return {
                error: true,
                statusCode: 500,
                updateError
            };
        }
    }

    async delete(id:string) {
        try {
            let item = await this.model.findByIdAndDelete(id);
            if (!item)
                return {
                    error: true,
                    statusCode: 404,
                    message: "item not found"
                };

            return {
                error: false,
                deleted: true,
                statusCode: 202,
                item
            };
        } catch (deleteError:any) {
            return {
                error: true,
                statusCode: 500,
                deleteError
            };
        }
    }
}

export default Service;