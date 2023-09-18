import {DBDriver} from "@database/Drivers/DBDriver";
import {getDbDriver} from "@database/Migrations/MigrationDbConnexion";
import LogHelper from "@src/Monitoring/Helpers/LogHelper";

/**
 * Up method, executed when we up migrations.
 */
export async function up (): Promise<void> {

    const db:DBDriver = getDbDriver();
    await db.connect();//check this when it's run in the env. of the API already running.

    if (db?.providers?.data) {

        const field = {status:'meta'}
        const subField = {status:'subMeta'}

        const subField2 = {
            team: {
                status: "subMeta"//
            }
        }

        //subMeta changer la structure vers Order seulement ou objet vide.

        const tasks = [
            /*{
                service: db.providers.data.services.EventsService,
                path: field
            },
            {
                service: db.providers.data.services.TaxonomyService,
                path: field
            },*/
            {
                service: db.providers.data.services.MediasService,
                path: field
            },
            /*{
                service: db.providers.data.services.OrganisationsService,
                path: field
            },
            {
                service: db.providers.data.services.PersonsService,
                path: field
            },
            {
                service: db.providers.data.services.PlacesService,
                path: field
            }*/
        ];

        //Event.status - Event.meta
        //Event.domains.status - Event.domains.subMeta
        //Event.team.[member].status = Event.team.[member].subMeta  //Event.team.status
        //##db.providers.data.services.EventsService

        //Taxonomy.status = Taxonomy.meta : EventType
        //##db.providers.data.services.TaxonomyService

        //Media.status - Media.meta
        //##db.providers.data.services.MediasService

        //Organisation.status = Organisation.meta
        //Organisation.domains.status = Organisation.domains.subMeta
        //Organisation.team.[member].status = Organisation.team.[member].subMeta
        //##db.providers.data.services.OrganisationsService

        //Persons.status = Organisation.meta
        //Persons.domains.status = Persons.domains.subMeta
        //##db.providers.data.services.PersonsService

        //Projects.status = Organisation.meta
        //Projects.domains.status = Persons.domains.subMeta
        //Projects.team.[member].status = Projects.team.[member].subMeta
        //##db.providers.data.services.ProjectsService


        //Place.status = Place.meta
        //##db.providers.data.services.ProjectsService

        //updateMany( {}, { $rename: { "status": "meta" } } )
        //updateMany( {}, { $rename: { "status": "subMeta" } } )


        //for (const task of tasks) {
            LogHelper.info("[Migration][Changing names] Creating the the seeder with task data");
            const results = await db.providers.data.services.MediasService.model.updateMany({}, { $rename: { "status": "meta" } } );
            console.log(db.providers.data.services.MediasService.model);
            console.log("results", results);
        //}


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