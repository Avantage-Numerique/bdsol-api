import {MongoDBDriver} from "@database/Drivers/MongoDriver";
import config from "@src/config";
import {runQueriesOnDatabase} from "@database/Helper/MongodbRunQueries";

const addVerify:any = [{
    $set: {
        verify: {
            isVerified: false,
            method: "migrations"
        }
    }
}];
const addIsVerifyToUsers:any = [
    {
        collection: "users",
        match: {"verify.isVerified": null},
        queries: [
            addVerify
        ]
    }
];

/**
 * Up method, executed when we up migrations.
 */
export async function up (): Promise<void> {
    const driver:MongoDBDriver = new MongoDBDriver(config.migrations);
    await runQueriesOnDatabase(driver, 'bdsol-users', addIsVerifyToUsers, 'Adding the field verify to users ', 'up');
}

/**
 * Down method, executed when we roll back migration.
 */
export async function down (): Promise<void> {
    //No rolling back from that.
}