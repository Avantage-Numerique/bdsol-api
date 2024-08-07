import {MongoDBDriver} from "@database/Drivers/MongoDriver";
import config from "@src/config";
import {runQueriesOnDatabase} from "@database/Helper/MongodbRunQueries";


const setEmptyArrayForEmptyUrl:any = [{
    $set: {
        url: []
    }
}]

const setEmptyUrlToEmptyArray:any = [
    {
        collection: "organisations",
        match: {"url": {"$exists" : true}},
        queries: [
            setEmptyArrayForEmptyUrl
        ]
    },
    {
        collection: "events",
        match: {"url": {"$exists" : true}},
        queries: [
            setEmptyArrayForEmptyUrl
        ]
    },
    {
        collection: "projects",
        match: {"url": {"$exists" : true}},
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
    await runQueriesOnDatabase(driver, 'bdsol-data', setEmptyUrlToEmptyArray, 'Arranging url to empty array arbitrarly', 'up');
}

/**
 * Down method, executed when we roll back migration.
 */
export async function down (): Promise<void> {
    //const driver:MongoDBDriver = new MongoDBDriver(config.migrations);
    // SOrry I didn't implement the down query.
    //await runQueriesOnDatabase(driver, 'bdsol-data', tasksRenameMetaToStatus, 'Renaming status to meta', 'down');
}