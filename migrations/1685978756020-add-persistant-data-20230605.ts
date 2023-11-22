import {getDbDriver} from "@database/Migrations/MigrationDbConnexion";
import SeederTaskContract from "@database/Seeders/SeederTaskContract";
import {TaxonomiesPersistantData} from "@src/Data/Taxonomies/TaxonomiesPersistantData";
import {taskSeeder} from "@database/Migrations/MigrationTaskSeeder";
import SeedData from "@database/Seeders/SeedData";
import {DBDriver} from "@database/Drivers/DBDriver";
import LogHelper from "@src/Monitoring/Helpers/LogHelper";

export async function up(): Promise<void> {
    const db:DBDriver = getDbDriver();
    await db.connect();//check this when it's run in the env. of the API already running.
    if (db?.providers?.data) {
        const persistantDataTasks: Array<SeederTaskContract> = [
            {
                service: db.providers.data.services.TaxonomyService,
                data: TaxonomiesPersistantData,
                whereKeys: ['category', 'name']
            }
        ];
        LogHelper.info("[Migration][add persistant data] task using the taskSeeder");
        await taskSeeder(persistantDataTasks, SeedData);
    } else {
        return Promise.reject(Error("Taxonomy Service is unaccessible to heat yp the task Seeder in this migration."));
    }
}

export async function down(): Promise<void> {
    // Write migration here
    // get the persistant data and search for it and
}