import {getDbDriver} from "@database/Migrations/MigrationDbConnexion";
import FileStorage from "@src/Storage/Files/FileStorage";
import {MongoSpawn} from "@database/Helper/MongoSpawn";
import {leadingZero} from "@src/Helpers/DateTime";

const BackukDbJob = async () => {
    await BackupDb('bdsol-data');
    await BackupDb('bdsol-users');
}

const BackupDb = async (dbName: string) => {

    const db = getDbDriver();

    const path:string = './localStorage/backup/db';
    FileStorage.createPathIfNotExist(path);

    await MongoSpawn('mongodump', {
        uri: `${db.getConnectionUrl(dbName)}`,
        dbName: dbName,
        archive: `${path}/${backupFileName(dbName)}`,
        gzip: true
    });
}

const backupFileName = (dbName:string, extension:string='gzip') => {

    const now:Date = new Date();
    const sep:string = "-";
    return `${now.getFullYear()}${leadingZero(now.getMonth())}${leadingZero(now.getDate())}${sep}${leadingZero(now.getHours())}${leadingZero(now.getMinutes())}${sep}${dbName}.${extension}`;
}

export {BackupDb, BackukDbJob};