import {MongoDBDriver} from "@database/Drivers/MongoDriver";
import config from "@src/config";
import {runQueriesOnDatabase} from "@database/Helper/MongodbRunQueries";

const setCurrentValuesToLocationObject:any = [{
    $set: {
        location: {
                address: "$address",
                city: "$city",
                region: "$region",
                mrc: "$mrc",
                province: "$province",
                postalCode: "$postalCode",
                country: "$country",
                latitude: "$latitude",
                longitude: "$longitude"
            }
    },
}];

const unsetCurrentValuesToLocationObject:any = {
    $unset: {
        address: "",
        city: "",
        region: "",
        mrc: "",
        province: "",
        postalCode: "",
        country: "",
        latitude: "",
        longitude: ""
    }
}
const queryAddressToLocationObject:any = [
    {
        collection: "places",
        queries: [
            setCurrentValuesToLocationObject,
            unsetCurrentValuesToLocationObject
        ]
    }
];

/**
 * Up method, executed when we up migrations.
 */
export async function up(): Promise<void> {
    const driver:MongoDBDriver = new MongoDBDriver(config.migrations);
    await runQueriesOnDatabase(driver, 'bdsol-data', queryAddressToLocationObject, 'Moving address data into location object', 'up');
}

/**
 * Down method, executed when we roll back migration.
 */
export async function down (): Promise<void> {
    //const driver:MongoDBDriver = new MongoDBDriver(config.migrations);
    // SOrry I didn't implement the down query.
    //await runQueriesOnDatabase(driver, 'bdsol-data', tasksRenameMetaToStatus, 'Renaming status to meta', 'down');
}