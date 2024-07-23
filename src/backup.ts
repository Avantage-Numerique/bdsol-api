import {BackupDb} from '@src/Schedule/Jobs/BackupDb';
import LogHelper from "@src/Monitoring/Helpers/LogHelper";

export const commandBackup = async () => {
    LogHelper.info("[Command][Backup] data + users");
    await BackupDb('bdsol-data');
    await BackupDb('bdsol-users');
    return;
}

commandBackup();