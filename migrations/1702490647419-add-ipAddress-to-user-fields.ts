import {MongoDBDriver} from "@database/Drivers/MongoDriver";
import config from "@src/config";
import {runQueriesOnDatabase} from "@database/Helper/MongodbRunQueries";

const setIpToVerify:any = [{
    $set: {
        "verify.ipAddress": ""
        }
    }
];
const setIpToTOS:any = [{
    $set: {
        "tos.ipAddress": ""
        }
    }
];
const setIpToChangePassword:any = [{
    $set: {
        "changePassword.ipAddress": ""
        }
    }
];

const addIpToFields:any = [
    {
        collection: "users",
        match: {"verify.ipAddress": null},
        queries: [
            setIpToVerify
        ]
    },
    {
        collection: "users",
        match: {"tos.ipAddress": null},
        queries: [
            setIpToTOS
        ]
    },
    {
        collection: "users",
        match: {"changePassword.ipAddress": null},
        queries: [
            setIpToChangePassword
        ]
    }
];

/**
 * Up method, executed when we up migrations.
 */
export async function up (): Promise<void> {
    const driver:MongoDBDriver = new MongoDBDriver(config.migrations);
    await runQueriesOnDatabase(driver, 'bdsol-users', addIpToFields, 'Adding the field verify to users ', 'up');
}

/**
 * Down method, executed when we roll back migration.
 */
export async function down (): Promise<void> {
    //No rolling back from that.
}