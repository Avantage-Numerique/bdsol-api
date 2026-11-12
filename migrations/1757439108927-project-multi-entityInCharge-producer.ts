import { MongoDBDriver } from "@database/Drivers/MongoDriver";
import { runQueriesOnDatabase } from "@database/Helper/MongodbRunQueries";

import config from "@src/config";

// migration s'il y a une valeur
const setExistingStringToArray: Array<{
    collection: string;
    queries: Array<any>;
    match?: any;
}> = [
    {
        collection: "projects",
        match: { entityInCharge: { $exists: true, $type: "string", $ne: "" } },
        queries: [[{ $set: { entityInCharge: ["$entityInCharge"] } }]],
    },

    {
        collection: "projects",
        match: { producer: { $exists: true, $type: "string", $ne: "" } },
        queries: [[{ $set: { producer: ["$producer"] } }]],
    },
];

// migration si il n'y a pas de valeur
const setEmptyStringToEmptyArray: Array<{
    collection: string;
    queries: Array<any>;
    match?: any;
}> = [
    {
        collection: "projects",
        match: {
            $or: [
                { entityInCharge: { $exists: true, $eq: "" } },
                { entityInCharge: { $exists: false } },
                { entityInCharge: { $eq: null } },
            ],
        },
        queries: [[{ $set: { entityInCharge: [] } }]],
    },

    {
        collection: "projects",
        match: {
            $or: [
                { producer: { $exists: true, $eq: "" } },
                { producer: { $exists: false } },
                { producer: { $eq: null } },
            ],
        },
        queries: [[{ $set: { producer: [] } }]],
    },
];

export async function up(): Promise<void> {
    const driver: MongoDBDriver = new MongoDBDriver(config.migrations);

    await runQueriesOnDatabase(
        driver,
        "bdsol-data",
        setExistingStringToArray,
        "Upgrading entityInCharge & producer on Project : string that are not empty into array of relations",
        "up"
    );
    await runQueriesOnDatabase(
        driver,
        "bdsol-data",
        setEmptyStringToEmptyArray,
        "Upgrading entityInCharge & producer on Project : string that are empty into empty array",
        "up"
    );
}

export async function down(): Promise<void> {
    // const driver: MongoDBDriver = new MongoDBDriver(config.migrations);
    // ...TODO, ou pas
}
