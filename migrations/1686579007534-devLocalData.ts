import {DBDriver} from "@database/Drivers/DBDriver";
import {getDbDriver} from "@database/Migrations/MigrationDbConnexion";
import SeederTaskContract from "@database/Seeders/SeederTaskContract";
import {taskSeeder} from "@database/Migrations/MigrationTaskSeeder";
import SeedData from "@database/Seeders/SeedData";
import {fakeUser} from "@src/Data/FakeEntities/fakeUser";
import {fakePersons} from "@src/Data/FakeEntities/fakePerson";
import {fakeOrganisations} from "@src/Data/FakeEntities/fakeOrganisations";
import {fakeUserHistories} from "@src/Data/FakeEntities/fakeUserHistories";
import config from "@src/config";

/**
 * Up method, executed when we up migrations.
 */
export async function up (): Promise<void> {

    if (config.environnement === 'development') {
        const db: DBDriver = getDbDriver();
        await db.connect();//check this when it's run in the env. of the API already running.
        if (db?.providers?.data) {
            const devDataTasks: Array<SeederTaskContract> = [
                {
                    service: this.providers.users.services.UsersService,
                    data: fakeUser,
                    whereKeys: ['username']
                },
                {
                    service: this.providers.data.services.PersonsService,
                    data: fakePersons,
                    whereKeys: ['firstName', 'lastName']
                },
                {
                    service: this.providers.data.services.OrganisationsService,
                    data: fakeOrganisations,
                    whereKeys: ['name']
                },
                {
                    service: this.providers.data.services.UsersHistoryService,
                    data: fakeUserHistories,
                    whereKeys: []
                }
            ];
            await taskSeeder(devDataTasks, SeedData);
        } else {
            return Promise.reject(Error("Migration up, can't initiate the data provider."));
        }
    }
}

/**
 * Down method, executed when we roll back migration.
 */
export async function down (): Promise<void> {

    if (config.environnement === 'development') {
        const db: DBDriver = getDbDriver();
        await db.connect();//check this when it's run in the env. of the API already running.
        if (db?.providers?.data) {
            return;
        } else {
            return Promise.reject(Error("Migration up, can't initiate the data provider."));
        }
    }
}