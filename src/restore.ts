import LogHelper from "@src/Monitoring/Helpers/LogHelper";
import {RestoreDb} from "@src/Schedule/Jobs/RestoreDb";

export const commandRestore = async () => {
    LogHelper.info("[Command][Restore] data + users");
    await RestoreDb('bdsol-data');
    //await RestoreDb('bdsol-users');
    return;
}

commandRestore();