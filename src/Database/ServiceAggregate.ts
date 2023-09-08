import AbstractModel from "@core/Model";


export default class ServiceAggregate {
    // take the model - mongooseModel

    public model:AbstractModel;

    constructor(model:AbstractModel) {
        this.model = model;
    }

    public async lookupFor($query:any, $lookupQUery:any):Promise<any> {
        let aggregateArray:Array<any> = [];
        aggregateArray.push($query);
        aggregateArray.push($lookupQUery);
        return this.model.mongooseModel.aggregate([
            {$match: $query},
            {$lookup: $lookupQUery}
        ]).exec();
    }

}