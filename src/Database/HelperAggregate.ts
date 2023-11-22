

const lookupByQuery = (target:any, by:string = "_id") => {

    return {
        $lookup: {
            from: target.from,
            localField: by,
            foreignField: target.foreignField,
            as: target.as
        }
    };
}

const lookupModelByQuery = (target:any, by:string = "_id") => {
    return {
        $lookup: {
            from: target.from ?? target.appModel.collectionName.toLowerCase(),
            localField: by,
            foreignField: target.foreignField,
            as: target.as ?? target.appModel.collectionName.toLowerCase()
        }
    };
}

const lookupByQueries = (queries:any, by:string="_id") => {
    let lookups:Array<any> = [];
    for (let query of queries) {
        lookups.push(lookupByQuery(query, query.by ?? by));
    }
    return lookups;
}

const lookupModelsByQueries = (queries:any, by:string="_id") => {
    let lookups:Array<any> = [];
    for (let query of queries) {
        if (typeof query.raw !== 'undefined') {
            lookups.push(query.raw);
            continue;
        }
        lookups.push(lookupModelByQuery(query, query.by ?? by));
    }
    return lookups;
}

export {lookupByQuery, lookupByQueries, lookupModelByQuery, lookupModelsByQueries};