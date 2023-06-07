import {DBDriver} from "@database/Drivers/DBDriver";
import {getDbDriver} from "@database/Migrations/MigrationDbConnexion";

/**
 * Up method, executed when we up migrations.
 */
export async function up (): Promise<void> {
    try {
        const db:DBDriver = getDbDriver();
        await db.connect();//check this when it's run in the env. of the API already running.
        if (db?.providers?.data) {

        } else {
            return Promise.reject(Error("Migration up, can't initiate the data provider."));
        }
    }
    catch (e:any) {
        throw e;
    }
}

/**
 * Down method, executed when we roll back migration.
 */
export async function down (): Promise<void> {
    try {
        const db:DBDriver = getDbDriver();
        await db.connect();//check this when it's run in the env. of the API already running.
        if (db?.providers?.data) {

        } else {
            return Promise.reject(Error("Migration up, can't initiate the data provider."));
        }
    }
    catch (e:any) {
        throw e;
    }
}