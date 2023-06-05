
import config from '../../config';
import {DBDriver} from "../Drivers/DBDriver";
import {MongooseDBDriver} from "../Drivers/MongooseDriver";
import ServerController from "../../Server/Controllers/ServerController";

const getDbDriver = ():DBDriver => {

    let db:DBDriver;

    // 1st implementation will be with the serveur running.

    // check if server is already running.
    if (ServerController.database !== undefined) {
        db = ServerController.database;
        console.log("Database is set, so we get the instance");
    }

    // check if server need to heat up to make the migration going.
    if (ServerController.database === undefined) {
        db = new MongooseDBDriver(config.migrations);
    }
    return db;
}


// in both cases, the mongo db serveur need to be up for this to work.
export {getDbDriver};