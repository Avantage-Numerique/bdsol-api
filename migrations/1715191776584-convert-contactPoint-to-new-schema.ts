import {MongoDBDriver} from "@database/Drivers/MongoDriver";
import config from "@src/config";
import {runQueriesOnDatabase} from "@database/Helper/MongodbRunQueries";


const querySetContactPointToNewSchemaFormat:any = [{
    $set: {
        contactPoint:
        {
            email: {
                address: "$contactPoint"
            },
            tel: {
                num: "",
                ext: "",
            },
            website: {
                url: "",
            }
        }
    }
}]


const collectionQueriesToContactPointNewFormat:any = [
    {
        collection: "organisations",
        match: {"contactPoint": {"$exists" : true}},
        queries: [
            querySetContactPointToNewSchemaFormat
        ]
    },
    {
        collection: "events",
        match: {"contactPoint": {"$exists" : true}},
        queries: [
            querySetContactPointToNewSchemaFormat
        ]
    },
    {
        collection: "projects",
        match: {"contactPoint": {"$exists" : true}},
        queries: [
            querySetContactPointToNewSchemaFormat
        ]
    },
]


/**
 * Up method, executed when we up migrations.
 */
export async function up(): Promise<void> {
    const driver:MongoDBDriver = new MongoDBDriver(config.migrations);
    await runQueriesOnDatabase(driver, 'bdsol-data', collectionQueriesToContactPointNewFormat, 'Changing the old contactPoint format to the new one', 'up');
}

/**
 * Down method, executed when we roll back migration.
 */
export async function down (): Promise<void> {
    //const driver:MongoDBDriver = new MongoDBDriver(config.migrations);
    // Sorry I didn't implement the down query.
    //await runQueriesOnDatabase(driver, 'bdsol-data', tasksRenameMetaToStatus, 'Renaming status to meta', 'down');
}