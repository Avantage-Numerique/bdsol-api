import {MongoDBDriver} from "@database/Drivers/MongoDriver";
import LogHelper from "@src/Monitoring/Helpers/LogHelper";

const runQueriesOnDatabase = async (driver:MongoDBDriver, dbName:string = "bdsol-data", tasks:Array<{ collection:string,queries:Array<any>,match?:any }>, name:string="Renaming Field", direction:string="up") => {
    try {
        const client = await driver.connect();
        const db:any = client.db(dbName);
        let currentResults:any;
        for (let task of tasks) {
            if (Array.isArray(task.queries)) {

                LogHelper.info(`[DB][Migration][${name}][${direction}] Starting for ${task.collection} with ${task.queries.length} query-ies >> `);
                let queryCount = 0;
                const matchQuery:any = task.match ?? {};

                for (let query of task.queries) {
                    queryCount++;
                    currentResults = await db.collection(task.collection).updateMany(matchQuery, query);
                    LogHelper.info(`${queryCount}. Results : `, currentResults, ` on ${task.collection}`);
                }
                LogHelper.info(`<< [DB][Migration][${name}][${direction}] Ending for ${task.collection}`);
            }
        }
    } catch (e:any) {
        throw new Error(e);
    } finally {
        // Ensures that the client will close when you finish/error
        await driver.close();
        LogHelper.info(`[DB][Migration][${name}][${direction}] Closing direct MongoClient`);
    }
}

export {runQueriesOnDatabase}