import LogHelper from "@src/Monitoring/Helpers/LogHelper";
import FileStorage from "@src/Storage/Files/FileStorage";
import {MongoSpawn} from "@database/Helper/MongoSpawn";
import {leadingZero} from "@src/Helpers/DateTime";
import config from "@src/config";
import {MongooseDBDriver} from "@database/Drivers/MongooseDriver";

export const backupBeforeSyncProdToStaging = async (dbName:string='bdsol-data') => {
    LogHelper.info(`[Command][syncProdToStaging] ${dbName} in ${config.environnement}`);
    if (config.environnement === 'staging' || config.environnement === 'development') {

        LogHelper.info(`[Command][syncProdToStaging] ${dbName}`);
        const dbDistant = new MongooseDBDriver(config.distantDb);
        const db = new MongooseDBDriver(config.localhostDb);

        const basePath:string = './localStorage/backup/db';
        FileStorage.createPathIfNotExist(basePath);

        const distantBasePath:string = `${basePath}/distant/${backupFolderName()}`;
        FileStorage.createPathIfNotExist(distantBasePath);

        const localBasePath:string = `${basePath}/local/${backupFolderName()}`;
        FileStorage.createPathIfNotExist(localBasePath);

        const localDbFileName:string = backupFileName(dbName);
        const localPath:string = `${localBasePath}/${localDbFileName}`;
        const distantDbFileName:string = backupFileName(dbName);
        const distantPath:string = `${distantBasePath}/${distantDbFileName}`;

        LogHelper.info(`[Command][syncProdToStaging] dumping ${dbName} from distant config`);
        //backup distant db locally
        const backupDistantDb = await MongoSpawn('mongodump', {
            uri: `${dbDistant.getConnectionUrl(dbName)}`,
            dbName: dbName,
            archive: `${distantPath}`,
            gzip: true
        });

        LogHelper.info(`[Command][syncProdToStaging] backuping ${dbName} before restoring from local config`);
        //Backup local ??
        const backupLocalDb = await MongoSpawn('mongodump', {
            uri: `${db.getConnectionUrl(dbName)}`,
            dbName: dbName,
            archive: `${localPath}`,
            gzip: true
        });

    }
}

const backupFileName = (dbName:string, extension:string='gzip') => {

    const now:Date = new Date();
    const sep:string = "-";
    //return `${now.getFullYear()}${leadingZero(now.getMonth())}${leadingZero(now.getDate())}${sep}${leadingZero(now.getHours())}${leadingZero(now.getMinutes())}${sep}${dbName}.${extension}`;
    return `${dbName}.${extension}`;
}
const backupFolderName = () => {

    const now:Date = new Date();
    const sep:string = "-";
    return `${now.getFullYear()}${leadingZero(now.getMonth())}${leadingZero(now.getDate())}${sep}${leadingZero(now.getHours())}`;//max 1 dump filename perhours.
}

backupBeforeSyncProdToStaging('bdsol-data');
backupBeforeSyncProdToStaging('bdsol-users');