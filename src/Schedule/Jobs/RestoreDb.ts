import {getDbDriver} from "@database/Migrations/MigrationDbConnexion";
import FileStorage from "@src/Storage/Files/FileStorage";
import {MongoSpawn} from "@database/Helper/MongoSpawn";
import LogHelper from "@src/Monitoring/Helpers/LogHelper";

const RestoreDbJob = async () => {
    LogHelper.info("[RestoreDbJob] not active yet.");
}

//filename ?
const RestoreDb = async (dbName: string) => {

    const db = getDbDriver();

    const path:string = './localStorage/backup/db';
    FileStorage.createPathIfNotExist(path);

    await MongoSpawn('mongorestore', {
        uri: `${db.connectionUrl(dbName)}`,
        dbName: dbName,
        archive: `${path}/${restoreFileName('distant-bdsol-data', '20231006', '1456')}`,
        gzip: true
    });
}

const restoreFileName = (dbName:string, date:string, time:string, extension:string='gzip') => {

    const sep:string = "-";
    return `${date}${sep}${time}${sep}${dbName}.${extension}`;
}

export {RestoreDb, RestoreDbJob};