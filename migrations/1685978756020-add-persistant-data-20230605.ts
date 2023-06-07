import {getDbDriver} from "@src/Database/Migrations/MigrationDbConnexion";
import SeederTaskContract from "../src/Database/Seeders/SeederTaskContract";
import {TaxonomiesPersistantData} from "@src/Taxonomy/TaxonomiesPersistantData";
import {taskSeeder} from "@src/Database/Migrations/MigrationTaskSeeder";
import SeedData from "@src/Database/Seeders/seed-data";
import {DBDriver} from "@src/Database/Drivers/DBDriver";

export async function up(): Promise<void> {
    try {
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
            await taskSeeder(persistantDataTasks, SeedData);
        } else {
            throw new Error("Taxonomy Service is unaccessible to heat yp the task Seeder in this migration.");
        }
    }
    catch (e:any) {
        console.log(e);
        throw e;
    }
}

export async function down(): Promise<void> {
    // Write migration here
    // get the persistant data and search for it and
}