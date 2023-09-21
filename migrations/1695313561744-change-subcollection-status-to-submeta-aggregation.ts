import {MongoDBDriver} from "@database/Drivers/MongoDriver";
import config from "@src/config";
import {runQueriesOnDatabase} from "@database/Helper/MongodbRunQueries";

/**
 * $map : //https://www.mongodb.com/docs/v6.0/reference/operator/aggregation/map/
 */
//https://www.mongodb.com/community/forums/t/how-to-rename-a-field-name-inside-nested-array/128280
const renameDomainStatus:any = [
    {
        $addFields: {
            "domains": {
                $map: {
                    input: "$domains",
                    as: "d",
                    in: {
                        "domain": "$$d.domain",
                        "subMeta": "$$d.status" // Rename 'status' to 'subMeta'
                    }
                }
            }
        }
    }
];
const renameTeamMembers:any = [
    {
        $addFields: {
            "team": {
                $map: {
                    input: "$team",
                    as: "t",
                    in: {
                        "member": "$$t.member",
                        "role": "$$t.role",
                        "subMeta": "$$t.status" // Rename 'status' to 'subMeta'
                    }
                }
            }
        }
    }
];

const renameDomainsStatusTasks:any = [
    {
        //Organisation.domains.status = Organisation.domains.subMeta
        //Organisation.team.[member].status = Organisation.team.[member].subMeta
        collection: "organisations",
        queries: [
            renameDomainStatus,
            renameTeamMembers
        ]
    },
    {
        //Organisation.domains.status = Organisation.domains.subMeta
        //Organisation.team.[member].status = Organisation.team.[member].subMeta
        collection: "events",
        queries: [
            renameDomainStatus,
            renameTeamMembers
        ]
    },
    {
        //Organisation.domains.status = Organisation.domains.subMeta
        //Organisation.team.[member].status = Organisation.team.[member].subMeta
        collection: "people",
        queries: [
            renameDomainStatus,
        ]
    },
    {
        //Organisation.domains.status = Organisation.domains.subMeta
        //Organisation.team.[member].status = Organisation.team.[member].subMeta
        collection: "projects",
        queries: [
            renameDomainStatus,
            renameTeamMembers
        ]
    }
];


/**
 * Up method, executed when we up migrations.
 */
export async function up(): Promise<void> {
    const driver:MongoDBDriver = new MongoDBDriver(config.migrations);
    await runQueriesOnDatabase(driver, 'bdsol-data', renameDomainsStatusTasks, 'Renaming domains.status to domains.subMeta and ', 'up');
}

/**
 * Down method, executed when we roll back migration.
 */
export async function down (): Promise<void> {
    const driver:MongoDBDriver = new MongoDBDriver(config.migrations);
    //await runQueriesOnDatabase(driver, 'bdsol-data', tasksRenameMetaToStatus, 'Renaming status to meta', 'down');
}