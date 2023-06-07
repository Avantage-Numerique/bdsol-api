//This is used in a scope outside of this origin. It's called in the folder of ./api/migrations/
import {getDbDriver} from "@database/Migrations/MigrationDbConnexion";
import SeederTaskContract from "@database/Seeders/SeederTaskContract";
import {TaxonomiesPersistantData} from "@src/Taxonomy/TaxonomiesPersistantData";
import {taskSeeder} from "@database/Migrations/MigrationTaskSeeder";
import SeedData from "@database/Seeders/seed-data";
import {DBDriver} from "@database/Drivers/DBDriver";

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
            return Promise.reject(Error("Can't initiate the data provider."));
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