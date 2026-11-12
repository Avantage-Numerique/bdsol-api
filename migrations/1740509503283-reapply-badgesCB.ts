import { MongoDBDriver } from "@database/Drivers/MongoDriver";
import config from "@src/config";
import { runQueriesOnDatabase } from "@database/Helper/MongodbRunQueries";

//Note : Only apply to people from "CB" region, but will discard any other badges and set badges = ["CB"]

const queryAddBadgeCBToBadgesArray: any = [
    {
        $set: {
            badges: ["CB"],
        },
    },
];

const collectionQueriesUpdateBadges: any = [
    {
        collection: "organisations",
        match: {
            region: {
                $in: ["abitibi-temiscamingue", "north Ontario", "baies-james"],
            },
        },
        queries: [queryAddBadgeCBToBadgesArray],
    },
    {
        collection: "people",
        match: {
            region: {
                $in: ["abitibi-temiscamingue", "north Ontario", "baies-james"],
            },
        },
        queries: [queryAddBadgeCBToBadgesArray],
    },
];

/**
 * Up method, executed when we up migrations.
 */
export async function up(): Promise<void> {
    const driver: MongoDBDriver = new MongoDBDriver(config.migrations);
    await runQueriesOnDatabase(
        driver,
        "bdsol-data",
        collectionQueriesUpdateBadges,
        'Updating people and organisations that are "not in other region" (in CB) with CB badge',
        "up"
    );
}

/**
 * Down method, executed when we roll back migration.
 */
export async function down(): Promise<void> {
    //const driver:MongoDBDriver = new MongoDBDriver(config.migrations);
    // Sorry I didn't implement the down query.
    //await runQueriesOnDatabase(driver, 'bdsol-data', tasksRenameMetaToStatus, 'Renaming status to meta', 'down');
}
