import {MongoDBDriver} from "@database/Drivers/MongoDriver";
import config from "@src/config";
import {runQueriesOnDatabase} from "@database/Helper/MongodbRunQueries";

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

const getAggregationSkillGroupQuery = (mainField:string) => {
    return [
        {
            $addFields: {
               [mainField]: {
                    $map: {
                        input: `$${mainField}`,
                        as: "mf",
                        in: {
                            "groupName": "$$mf.groupName",
                            "skills": "$$mf.skills",
                            "subMeta": "$$mf.status" // Rename 'status' to 'subMeta'
                        }
                    }
                }
            }
        }
    ];
}

const renameStatusToMetaTasks:any = [
    {
        collection: "organisations",
        queries: [
            renameDomainStatus,
            renameTeamMembers,
            getAggregationSkillGroupQuery('offers')
        ]
    },
    {
        collection: "events",
        queries: [
            renameDomainStatus,
            renameTeamMembers
        ]
    },
    {
        collection: "people",
        queries: [
            renameDomainStatus,
            getAggregationSkillGroupQuery('occupations')
        ]
    },
    {
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
    await runQueriesOnDatabase(driver, 'bdsol-data', renameStatusToMetaTasks, 'Renaming domains.status to domains.subMeta and ', 'up');
}

/**
 * Down method, executed when we roll back migration.
 */
export async function down (): Promise<void> {
    const driver:MongoDBDriver = new MongoDBDriver(config.migrations);
    // SOrry I didn't implement the down query.
    //await runQueriesOnDatabase(driver, 'bdsol-data', tasksRenameMetaToStatus, 'Renaming status to meta', 'down');
}