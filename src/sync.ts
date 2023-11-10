import LogHelper from "@src/Monitoring/Helpers/LogHelper";
import {MongoSpawn} from "@database/Helper/MongoSpawn";
import config from "@src/config";
import {MongooseDBDriver} from "@database/Drivers/MongooseDriver";

export const syncProdToStaging = async (dbName:string='bdsol-data') => {
    LogHelper.info(`[Command][syncProdToStaging] ${dbName} in ${config.environnement}`);
    if (config.environnement === 'staging' || config.environnement === 'development') {

        LogHelper.info(`[Command][syncProdToStaging] ${dbName}`);
        const dbDistant = new MongooseDBDriver(config.distantDb);
        const db = new MongooseDBDriver(config.localhostDb);


        const basePath:string = "D:/web/bdsol-workspace/api/localStorage/backup/db";

        const distantBasePath:string = `${basePath}/distant/${backupFolderName()}`;

        const localBasePath:string = `${basePath}/local/${backupFolderName()}`;

        const localDbFileName:string = backupFileName(dbName);
        const localPath:string = `${localBasePath}/${localDbFileName}`;
        const distantDbFileName:string = backupFileName(dbName);
        const distantPath:string = `${distantBasePath}/${distantDbFileName}`;

        LogHelper.info(`[Command][syncProdToStaging] restoring ${dbName} into local config from ${distantPath} file`);

        // Restore to local from the distant.
        const restoreDistantToLocalDb = MongoSpawn('mongorestore', {
            uri: `${db.connectionUrl(dbName)}`,
            archive: `${distantPath}`,
            gzip:true,
        });
        //mongorestore --uri mongodb://appBdUser:appBdUserPw@localhost:27018/bdsol-data?authSource=admin --archive=D:\web\bdsol-workspace\api\localStorage\backup\db\distant\20231006-18\bdsol-data.gzip --gzip
    }
}

const backupFileName = (dbName:string, extension:string='gzip') => {

    //const now:Date = new Date();
    //const sep:string = "-";
    return `${dbName}.${extension}`;//${now.getFullYear()}${leadingZero(now.getMonth())}${leadingZero(now.getDate())}${sep}${leadingZero(now.getHours())}${leadingZero(now.getMinutes())}${sep}
}

const backupFolderName = () => {
    return "20231006-21";
}

syncProdToStaging('bdsol-staging');
syncProdToStaging('bdsol-users');