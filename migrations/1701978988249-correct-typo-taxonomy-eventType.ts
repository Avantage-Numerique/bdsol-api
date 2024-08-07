import {DBDriver} from "@database/Drivers/DBDriver";
import {getDbDriver} from "@database/Migrations/MigrationDbConnexion";

/**
 * Up method, executed when we up migrations.
 */
export async function up (): Promise<void> {

    const db:DBDriver = getDbDriver();
    await db.connect();//check this when it's run in the env. of the API already running.
    if (db?.providers?.data) {
        //data have been corrected in production. So this return an error.
        /*await Taxonomy.getInstance().mongooseModel.findOneAndUpdate(
            {category: "eventType", name: "Entreprenariale"},
            {name: "Entrepreneurial"}
        )*/
        return;
    } else {
        return Promise.reject(Error("Migration up, can't initiate the data provider."));
    }
}

/**
 * Down method, executed when we roll back migration.
 */
export async function down (): Promise<void> {
    const db:DBDriver = getDbDriver();
    await db.connect();//check this when it's run in the env. of the API already running.
    if (db?.providers?.data) {
        return;
    } else {
        return Promise.reject(Error("Migration up, can't initiate the data provider."));
    }
}