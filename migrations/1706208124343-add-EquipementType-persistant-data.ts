import {getDbDriver} from "@database/Migrations/MigrationDbConnexion";
import SeederTaskContract from "@database/Seeders/SeederTaskContract";
import {taskSeeder} from "@database/Migrations/MigrationTaskSeeder";
import SeedData from "@database/Seeders/SeedData";
import {DBDriver} from "@database/Drivers/DBDriver";
import LogHelper from "@src/Monitoring/Helpers/LogHelper";
import { EquipmentTypePersistantData } from "@src/Data/Taxonomies/EquipmentTypePersistantData";

import config from "@src/config";

export async function up(): Promise<void> {
    const db:DBDriver = getDbDriver(config.migrations);
    await db.connect();//check this when it's run in the env. of the API already running.
    if (db?.providers?.data) {
        const persistantDataTasks: Array<SeederTaskContract> = [
            {
                service: db.providers.data.services.TaxonomyService,
                data: EquipmentTypePersistantData,
                whereKeys: ['category', 'name']
            }
        ];
        LogHelper.info("[Migration][add persistant data] task using the taskSeeder");
        await taskSeeder(persistantDataTasks, SeedData);
    } else {
        return Promise.reject(Error("Taxonomy Service is unaccessible to heat up the task Seeder in this migration."));
    }
}

export async function down(): Promise<void> {
    // Write migration here
    // get the persistant data and search for it and
}