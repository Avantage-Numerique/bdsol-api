import {DBDriver} from "@database/Drivers/DBDriver";
import {getDbDriver} from "@database/Migrations/MigrationDbConnexion";
import LogHelper from "@src/Monitoring/Helpers/LogHelper";
import {MongoDBDriver} from "@database/Drivers/MongoDriver";
import config from "@src/config";

/* Les notes sur les collections à changer de nom >>
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
*/

//do the same, but with sub stask to includes likes domains and shiut

const rename = {
    $rename: {
        status: 'meta'
    }
}

const reverseRename = {
    $rename: {
        meta: 'status'
    }
}


const tasksRenameStatus:any = [
    {
        collection: "medias",
        queries: [
            rename,
        ]
    },
    {
        //Event.domains.status - Event.domains.subMeta
        //Event.team.[member].status = Event.team.[member].subMeta  //Event.team.status
        collection: "events",
        queries: [
            rename
        ]
    },
    {
        collection: "taxonomies",
        queries: [
            rename,
        ]
    },
    {
        //Organisation.domains.status = Organisation.domains.subMeta
        //Organisation.team.[member].status = Organisation.team.[member].subMeta
        collection: "organisations",
        queries: [
            rename,
        ]
    },
    {
        //Persons.domains.status = Persons.domains.subMeta
        collection: "people",
        queries: [
            rename,
        ]
    },
    {
        collection: "places",
        queries: [
            rename,
        ]
    },
    {
        //Projects.domains.status = Persons.domains.subMeta
        //Projects.team.[member].status = Projects.team.[member].subMeta
        collection: "projects",
        queries: [
            rename,
        ]
    }
];

const tasksRenameMetaToStatus:any = [
    {
        collection: "medias",
        queries: [
            reverseRename,
        ]
    },
    {
        collection: "events",
        queries: [
            reverseRename
        ]
    },
    {
        collection: "taxonomies",
        queries: [
            reverseRename,
        ]
    },
    {
        collection: "organisations",
        queries: [
            reverseRename,
        ]
    },
    {
        collection: "people",
        queries: [
            reverseRename,
        ]
    },
    {
        collection: "places",
        queries: [
            reverseRename,
        ]
    },
    {
        collection: "projects",
        queries: [
            reverseRename,
        ]
    }
];

/**
 * Up method, executed when we up migrations.
 */
export async function up(): Promise<void> {
    const driver:MongoDBDriver = new MongoDBDriver(config.migrations);
    await runQueriesOnDatabase(driver, 'bdsol-data', tasksRenameStatus, 'Renaming meta', 'up');
}

/**
 * Down method, executed when we roll back migration.
 */
export async function down (): Promise<void> {
    const driver:MongoDBDriver = new MongoDBDriver(config.migrations);
    await runQueriesOnDatabase(driver, 'bdsol-data', tasksRenameMetaToStatus, 'Renaming status to meta', 'down');
}


const runQueriesOnDatabase = async (driver:MongoDBDriver, dbName:string = "bdsol-data", tasks:Array<{ collection:string,queries:Array<any> }>, name:string="Renaming Field", direction:string="up") => {
    try {
        const client = await driver.connect();
        const db:any = client.db(dbName);
        let currentResults:any;
        for (let task of tasks) {
            if (Array.isArray(task.queries)) {

                LogHelper.info(`[DB][Migration][${name}][${direction}] Starting for ${task.collection} with ${task.queries.length} query-ies >> `);
                let queryCount = 0;
                for (let query of task.queries) {
                    queryCount++;
                    currentResults = await db.collection(task.collection).updateMany({}, query);
                    LogHelper.info(`${queryCount}. Results : `, currentResults, ` on ${task.collection}`);
                }
                LogHelper.info(`<< [DB][Migration][${name}][${direction}] Ending for ${task.collection}`);
            }
        }
    } catch (e:any) {
        throw new Error(e);
    } finally {
        // Ensures that the client will close when you finish/error
        await driver.close();
        LogHelper.info(`[DB][Migration][${name}][${direction}] Closing direct MongoClient`);
    }
}


/**
 * To be used, it must have the up name.
 * I keep that there, because this use the api structure with mongoose.
 */
export async function upMongoose (): Promise<void> {

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
            /*{
                service: db.providers.data.services.MediasService,// this didn't work.
                path: field
            },*/
            /*{
                service: db.providers.data.services.OrganisationsService,
                path: field
            },*/
            /*{
                service: db.providers.data.services.PersonsService,
                path: field
            },*/
            {
                service: db.providers.data.services.PlacesService,
                path: field
            }
        ];


        for (const task of tasks) {
            LogHelper.info("[Migration][Changing names] Creating the the seeder with task data");
            const results = await task.service.model.updateMany({}, { $rename: { status: "meta" } });
            console.log(task.service.model);
            console.log("results", results);
        }


    } else {
        return Promise.reject(Error("Migration up, can't initiate the data provider."));
    }
}
