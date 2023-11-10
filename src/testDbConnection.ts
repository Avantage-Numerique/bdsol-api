import LogHelper from "@src/Monitoring/Helpers/LogHelper";
import config from "@src/config";
import {MongooseDBDriver} from "@database/Drivers/MongooseDriver";
import {buildConnectionUrlParams} from "@database/Drivers/Connection";

import {MongoClient} from 'mongodb';
import {MongoDBDriver} from "@database/Drivers/MongoDriver";

export const testDbConnection = async () => {
    LogHelper.info(`[Command][testDbConnection] in ${config.environnement}`);
    if (config.environnement === 'staging' || config.environnement === 'development') {

        LogHelper.info(`[Command][testDbConnection]`);
        const driver:MongooseDBDriver = new MongooseDBDriver(buildConnectionUrlParams(config.db));

        const logPrefix:string = "[Command][testDbConnection] ";
        LogHelper.info(`${logPrefix} Full : ${driver.urlToLog(driver.connectionUrl())}`);
        LogHelper.info(`${logPrefix} base : ${driver.urlToLog(driver.connectionBaseUrl())}`);

    }
}

/*async function run() {
    const driver:MongooseDBDriver = new MongooseDBDriver(buildConnectionUrlParams(config.db));
    const uri = driver.connectionUrl();
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}*/

const driver:MongoDBDriver = new MongoDBDriver(config.db);
let client:MongoClient = driver.client;
async function pingDatabase(dbName:string="bdsol-data"):Promise<void> {

    let ping:any;
    try {
        await client.connect();
        ping = await client.db(dbName).command({ ping: 1 });
        LogHelper.info(`Pinging mongodb serveur ${dbName}`, ping);

        console.log(`Pinged databased ${dbName}`, (ping?.ok === 1));
    } catch (e) {
        console.error(`Pinged databased ${dbName}`, e);
        client.close();
        return;
    } finally {
        console.log(`Pinged databased ${dbName} end`);
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
//pingDatabase('bdsol-data');
pingDatabase('bdsol-users');

//run().catch(console.dir);