import config from '@src/config';
import {DBDriver} from "@database/Drivers/DBDriver";
import {MongooseDBDriver} from "@database/Drivers/MongooseDriver";
import ServerController from "@src/Server/Controllers/ServerController";

/**
 * Use in migration and in Scheduler.
 */
const getDbDriver = ():DBDriver => {

    let db:DBDriver;

    // 1st implementation will be with the serveur running.

    // check if server is already running.
    if (typeof ServerController.database !== 'undefined') {
        return ServerController.database;
    }

    // check if server need to heat up to make the migration going.
    return new MongooseDBDriver(config.migrations);
}


// in both cases, the mongo db serveur need to be up for this to work.
export {getDbDriver};