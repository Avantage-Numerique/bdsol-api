import {getDbDriver} from "@database/Migrations/MigrationDbConnexion";
import FileStorage from "@src/Storage/Files/FileStorage";
import {MongoSpawn} from "@database/Helper/MongoSpawn";
import {leadingZero} from "@src/Helpers/DateTime";
import LogHelper from "@src/Monitoring/Helpers/LogHelper";
import {getApiConfig} from "@src/config";
import BackupStorage from "@src/Storage/Files/BackupStorage";
import {Str} from "@src/Helpers/Str";

const BackukDbJob = async () => {
    const dataBckupResult:any = await BackupDb('bdsol-data');
    const usersBckupResult:any = await BackupDb('bdsol-users');
    return true;//finished
}

const BackupDb = async (dbName: string) => {
    LogHelper.info("[JOB Callback] BackupDb starting");
    const db = getDbDriver();

    const path:string = `${BackupStorage.basePath}/db`;//'./localStorage/backup/db';
    FileStorage.createPathIfNotExist(path);

    return await MongoSpawn('mongodump', {
        uri: `${db.connectionUrl(dbName)}`,
        dbName: dbName,
        archive: `${path}/${backupFileName(dbName)}`,
        gzip: true
    });
}

const backupFileName = (dbName:string, extension:string='gzip') => {

    const now:Date = new Date();
    const sep:string = "-";
    const config = getApiConfig();
    const currentAppContextName = `${config.appName}${sep}${config.environnement}${sep}${config.version}`;
    return `${now.getFullYear()}${leadingZero(now.getMonth())}${leadingZero(now.getDate())}${sep}${leadingZero(now.getHours())}${leadingZero(now.getMinutes())}${sep}${dbName}${sep}${Str.kebab(currentAppContextName)}.${extension}`;
}

export {BackupDb, BackukDbJob};