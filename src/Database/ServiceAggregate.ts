import AbstractModel from "@core/Model";


export default class ServiceAggregate {
    // take the model - mongooseModel

    public model:AbstractModel;

    constructor(model:AbstractModel) {
        this.model = model;
    }

    public async lookupFor($query:any, $lookupQUery:any):Promise<any> {
        return this.model.mongooseModel.aggregate([
            {$match: $query},
            {$lookup: $lookupQUery}
        ]).exec();
    }

    public async lookupMultiple(query:any, lookupQueries:Array<any>):Promise<any> {
        return this.model.mongooseModel.aggregate([
            {$match: query},
            ...lookupQueries
        ]).exec();
    }

    public populateProperty(property:string) {
        return {
            $addFields: {
                [property]: {
                    $map: {
                        input: `$${property}`,
                        as: "mf",
                        in: {
                            "groupName": "$$mf.groupName",
                            "skills": "$$mf.skills",
                            "subMeta": "$$mf.status" // Rename 'status' to 'subMeta'
                        }
                    }
                }
            }
        }
    }
}

