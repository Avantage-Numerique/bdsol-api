import {getDbDriver} from "@database/Migrations/MigrationDbConnexion";
import SeederTaskContract from "@database/Seeders/SeederTaskContract";

import organisations from "@src/Data/Organisations/templateReducedOrganisation.json";
import persons from "@src/Data/Persons/templateReducedPerson.json";
import projects from "@src/Data/Projects/templateReducedProject.json";

import {taskSeeder} from "@database/Migrations/MigrationTaskSeeder";
import SeedData from "@database/Seeders/SeedData";
import {DBDriver} from "@database/Drivers/DBDriver";
import LogHelper from "@src/Monitoring/Helpers/LogHelper";

export async function up(): Promise<void> {
    const db:DBDriver = getDbDriver();
    await db.connect();//check this when it's run in the env. of the API already running.
    if (db?.providers?.data) {
        const tasks: Array<SeederTaskContract> = [
            {
                service: db.providers.data.services.OrganisationsService,
                data: organisations,
                whereKeys: ['name']
            },
            {
                service: db.providers.data.services.PersonsService,
                data: persons,
                whereKeys: ['lastName', 'firstName']
            },
            {
                service: db.providers.data.services.ProjectsService,
                data: projects,
                whereKeys: ['name']
            }
        ];
        LogHelper.info("[Migration][add persistant jotform data] task using the taskSeeder");

        await taskSeeder(tasks, SeedData);
    } else {
        return Promise.reject(Error("Entites Services are unaccessible to heat yp the task Seeder in this migration."));
    }
}

export async function down(): Promise<void> {
    // Write migration here
    // get the persistant data and search for it and
}