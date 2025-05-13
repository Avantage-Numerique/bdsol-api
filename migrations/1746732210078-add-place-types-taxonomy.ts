import {getDbDriver} from "@database/Migrations/MigrationDbConnexion";
import SeederTaskContract from "@database/Seeders/SeederTaskContract";
import {taskSeeder} from "@database/Migrations/MigrationTaskSeeder";
import SeedData from "@database/Seeders/SeedData";
import {DBDriver} from "@database/Drivers/DBDriver";
import LogHelper from "@src/Monitoring/Helpers/LogHelper";
import { PlaceTypePersistantData } from "@src/Data/Taxonomies/PlaceTypePersistantData";

export async function up(): Promise<void> {
    const db:DBDriver = getDbDriver();
    await db.connect();//check this when it's run in the env. of the API already running.
    if (db?.providers?.data) {
        const persistantDataTasks: Array<SeederTaskContract> = [
            {
                service: db.providers.data.services.TaxonomyService,
                data: PlaceTypePersistantData,
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