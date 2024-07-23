import {MongoDBDriver} from "@database/Drivers/MongoDriver";
import config from "@src/config";

const setSocialHandlesWithExistingUrl:any = [{
    $set: {
        url: [
            {
                url: "$url",
                label: "$url"
            }
        ]
    }
}];

//If values are already empty array, this condition doesn't work.
//I tried to modify the condition, without success, here's what I've tried
//Maybe try "$size" ?
/*
        match: {"$and":
            [
                {"url": {"$exists" : true}},
                {"$or":
                    [
                        {"url": {"$ne" : ""}},
                        {"url": {"$type": 'array', "$ne" : []}}
                    ]
                }
            ]},
*/

const setExistingUrlToSocialHandles:any = [
    {
        collection: "organisations",
        match: {"url": {"$exists" : true, "$ne" : ""}},
        queries: [
            setSocialHandlesWithExistingUrl
        ]
    },
    {
        collection: "events",
        match: {"url": {"$exists" : true, "$ne" : ""}},
        queries: [
            setSocialHandlesWithExistingUrl
        ]
    },
    {
        collection: "projects",
        match: {"url": {"$exists" : true, "$ne" : ""}},
        queries: [
            setSocialHandlesWithExistingUrl
        ]
    },
    //Correct typo in taxonomies
];

const setEmptyArrayForEmptyUrl:any = [{
    $set: {
        url: []
    }
}]

const setEmptyUrlToEmptyArray:any = [
    {
        collection: "organisations",
        match: {"url": {"$exists" : true, "$eq" : ""}},
        queries: [
            setEmptyArrayForEmptyUrl
        ]
    },
    {
        collection: "events",
        match: {"url": {"$exists" : true, "$eq" : ""}},
        queries: [
            setEmptyArrayForEmptyUrl
        ]
    },
    {
        collection: "projects",
        match: {"url": {"$exists" : true, "$eq" : ""}},
        queries: [
            setEmptyArrayForEmptyUrl
        ]
    },
]


/**
 * Up method, executed when we up migrations.
 */
export async function up(): Promise<void> {
    const driver:MongoDBDriver = new MongoDBDriver(config.migrations);
    //skip this, make infinite object -> array in the data.
    //await runQueriesOnDatabase(driver, 'bdsol-data', setExistingUrlToSocialHandles, 'Arranging url:string that are not empty into array of SocialHandles', 'up');
    //await runQueriesOnDatabase(driver, 'bdsol-data', setEmptyUrlToEmptyArray, 'Arranging url:string that are empty string into empty array to prepare future SocialHandles ', 'up');
}

/**
 * Down method, executed when we roll back migration.
 */
export async function down (): Promise<void> {
    //const driver:MongoDBDriver = new MongoDBDriver(config.migrations);
    // SOrry I didn't implement the down query.
    //await runQueriesOnDatabase(driver, 'bdsol-data', tasksRenameMetaToStatus, 'Renaming status to meta', 'down');
}