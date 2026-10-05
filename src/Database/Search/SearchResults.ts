import mongoose from "mongoose";
import Organisation from "../../Organisations/Models/Organisation";
import Person from "../../Persons/Models/Person";
import Project from "../../Projects/Models/Project";
import Taxonomy from "../../Taxonomy/Models/Taxonomy";
import LogHelper from "@src/Monitoring/Helpers/LogHelper";
import Event from "@src/Events/Models/Event";
import Equipment from "@src/Equipment/Models/Equipment";
import EntityControllerFactory from "@src/Abstract/EntityControllerFactory";
import { ErrorResponse } from "@src/Http/Responses/ErrorResponse";
import { StatusCodes } from "http-status-codes";
import { getApiConfig } from "@src/config";
import { paginationAggregation } from "@database/Aggregation/PaginationAggregation";

class SearchResults {
    //Entities models
    public personModel: any;
    public organisationModel: any;
    public taxonomyModel: any;
    public projectModel: any;
    public eventModel: any;
    public equipmentModel: any;

    public configs: any;
    private constructor() {}

    //Singleton
    public static _instance: SearchResults;
    public static getInstance(): SearchResults {
        if (SearchResults._instance === undefined) {
            SearchResults._instance = new SearchResults();

            SearchResults._instance.personModel = Person.getInstance().mongooseModel;
            SearchResults._instance.organisationModel = Organisation.getInstance().mongooseModel;
            SearchResults._instance.taxonomyModel = Taxonomy.getInstance().mongooseModel;
            SearchResults._instance.projectModel = Project.getInstance().mongooseModel;
            SearchResults._instance.eventModel = Event.getInstance().mongooseModel;
            SearchResults._instance.equipmentModel = Equipment.getInstance().mongooseModel;
            SearchResults._instance.configs = getApiConfig();
        }
        return SearchResults._instance;
    }

    public async fetchHomePageEntity() {
        const homePageEntities = [];

        homePageEntities.push(await this.personModel.findOne({}, {}, { sort: { updatedAt: -1 } }));
        homePageEntities.push(await this.organisationModel.findOne({}, {}, { sort: { updatedAt: -1 } }));
        //Commented because taxonomy doesn't have a simple component in frontend
        //homePageEntity.push(await this.taxonomyModel.findOne({}, {}, { sort : { updatedAt: -1 } }));
        homePageEntities.push(await this.projectModel.findOne({}, {}, { sort: { updatedAt: -1 } }));
        homePageEntities.push(await this.eventModel.findOne({}, {}, { sort: { updatedAt: -1 } }));
        homePageEntities.push(await this.equipmentModel.findOne({}, {}, { sort: { updatedAt: -1 } }));

        //fetch a 6th entity for frontend (atm always the second last person modified)
        homePageEntities.push(await this.personModel.findOne({}, {}, { sort: { updatedAt: -1 }, skip: 1 }));

        return homePageEntities;
    }

    /**
     * Get the most recent changed entity in each of our collections.
     * People, organisations, projects, events,
     * @param limit
     */
    public async lastUpdatedEntities(limit: number = 1) {
        const sorting = { updatedAt: -1 };
        return await this.personModel.aggregate([
            { $sort: sorting },
            { $limit: limit },
            {
                $addFields: {
                    type: "Person",
                    collection: "people",
                },
            },

            {
                $unionWith: {
                    coll: "organisations",
                    pipeline: [
                        { $sort: sorting },
                        { $limit: limit },
                        {
                            $addFields: {
                                type: "Organisation",
                                collection: "organisations",
                            },
                        },
                    ],
                },
            },

            {
                $unionWith: {
                    coll: "events",
                    pipeline: [
                        { $sort: sorting },
                        { $limit: limit },
                        {
                            $addFields: {
                                type: "Event",
                                collection: "events",
                            },
                        },
                    ],
                },
            },

            {
                $unionWith: {
                    coll: "equipment",
                    pipeline: [
                        { $sort: sorting },
                        { $limit: limit },
                        {
                            $addFields: {
                                type: "Equipment",
                                collection: "equipment",
                            },
                        },
                    ],
                },
            },

            {
                $unionWith: {
                    coll: "projects",
                    pipeline: [
                        { $sort: sorting },
                        { $limit: limit },
                        {
                            $addFields: {
                                type: "Project",
                                collection: "projects",
                            },
                        },
                    ],
                },
            },

            {
                $unionWith: {
                    coll: "people",
                    pipeline: [
                        { $sort: sorting },
                        { $skip: 1 }, //to have 2 person, and avoid getting the first one.
                        { $limit: limit },
                        {
                            $addFields: {
                                type: "Person",
                                collection: "people",
                            },
                        },
                    ],
                },
            },
            {
                $lookup: {
                    from: "media",
                    localField: "mainImage",
                    foreignField: "_id",
                    as: "mainImageDetails",
                },
            },
            {
                $unwind: {
                    path: "$mainImageDetails",
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $set: {
                    mainImage: {
                        $cond: {
                            if: { $ne: ["$mainImageDetails", null] },
                            then: "$mainImageDetails",
                            else: "$mainImage",
                        },
                    },
                },
            },
            {
                $project: {
                    mainImageDetails: 0,
                },
            },
        ]);
    }

    public async searchByType(type: string, skip: number, limit: number) {
        //, categories:any){
        const controller = EntityControllerFactory.getControllerFromEntity(type);
        if (controller !== undefined) {
            return await controller.list({
                skip: skip,
                limit: limit,
                sort: "desc",
            });
        }
        return ErrorResponse.create(new Error("Type doesn't exist"), StatusCodes.BAD_REQUEST, "Type doesn't exist");
    }

    //For pagination, acts as a
    public async countByType(type: string) {
        const controller = EntityControllerFactory.getControllerFromEntity(type);
        if (controller !== undefined) {
            return await controller.count({});
        }
        return ErrorResponse.create(new Error("Type doesn't exist"), StatusCodes.BAD_REQUEST, "Type doesn't exist");
    }

    public async getTextSearchResult(searchIndex: string | undefined) {
        //Send out $text : { $search : req.query } to all entity
        const promises = [];
        promises.push(
            await this.personModel.find({ $text: { $search: searchIndex } }, { score: { $meta: "textScore" } })
        );
        promises.push(
            await this.organisationModel.find({ $text: { $search: searchIndex } }, { score: { $meta: "textScore" } })
        );
        promises.push(
            await this.projectModel.find({ $text: { $search: searchIndex } }, { score: { $meta: "textScore" } })
        );

        promises.push(
            await this.taxonomyModel.find({ $text: { $search: searchIndex } }, { score: { $meta: "textScore" } })
        );

        promises.push(
            await this.eventModel.find({ $text: { $search: searchIndex } }, { score: { $meta: "textScore" } })
        );
        promises.push(
            await this.equipmentModel.find({ $text: { $search: searchIndex } }, { score: { $meta: "textScore" } })
        );

        let textSearchResultArray;
        if (promises.length > 0) {
            textSearchResultArray = promises
                .flat()
                .map((el) => {
                    return JSON.stringify(el.toJSON());
                })
                .map((str) => {
                    return JSON.parse(str);
                });
            //Would love to merge sort the results :) but this more easy V
            textSearchResultArray.sort(function (a, b) {
                return b.score - a.score;
            });
        }

        return textSearchResultArray;
    }

    public async getLinkedEntitiesToTaxonomyByCatAndSlug(category: string, slug: string): Promise<any> {
        const taxonomy = await this.taxonomyModel.find({
            category: category,
            slug: slug,
        });
        if (taxonomy.length > 0) {
            //const taxonomyId = taxonomyModel?.shift()?._id;
            const taxonomyId = taxonomy[0]._id;

            if (taxonomyId) {
                const linkedEntities: Array<any> = await this.findEntityLinkedToTaxonomy(taxonomyId);
                await this._embedEntitiesCountInTaxonomy(taxonomy[0], linkedEntities);
                return linkedEntities;
            }
        }
        return {};
    }

    public async findEntityLinkedToTaxonomy(taxonomyId: string) {
        if (mongoose.isObjectIdOrHexString(taxonomyId)) {
            const paramId = new mongoose.Types.ObjectId(taxonomyId);
            const promises = [];
            promises.push(
                await this.personModel.find({
                    $or: [{ "occupations.skills": paramId }, { "domains.domain": paramId }],
                })
            );
            promises.push(
                await this.organisationModel.find({
                    $or: [{ "offers.skills": paramId }, { "domains.domain": paramId }],
                })
            );
            promises.push(await this.projectModel.find({ skills: paramId }));

            promises.push(
                await this.eventModel.find({
                    $or: [{ skills: paramId }, { "domains.domain": paramId }, { eventType: paramId }],
                })
            );
            promises.push(await this.equipmentModel.find({ equipmentType: paramId }));

            let tagSearchResult = [];
            if (promises.length > 0) {
                tagSearchResult = promises.flat();
            }
            return tagSearchResult;
        }
        return [];
    }

    public async searchPaginate(
        skip: number = 0,
        limit: number = this.configs.pagination.pageLimitDefault,
        sort: number = this.configs.pagination.sortDirectionDefault
    ) {
        const targetSkip: number = skip;
        const targetLimit: number = limit;
        const targetSort: number = sort;

        const aggregationPipeline = [
            {
                $addFields: {
                    type: "Person",
                    collection: "people",
                },
            },
            {
                $unionWith: {
                    coll: "organisations",
                    pipeline: [
                        {
                            $addFields: {
                                type: "Organisation",
                                collection: "organisations",
                            },
                        },
                    ],
                },
            },
            {
                $unionWith: {
                    coll: "events",
                    pipeline: [
                        {
                            $addFields: {
                                type: "Event",
                                collection: "events",
                            },
                        },
                    ],
                },
            },
            {
                $unionWith: {
                    coll: "projects",
                    pipeline: [
                        {
                            $addFields: {
                                type: "Project",
                                collection: "projects",
                            },
                        },
                    ],
                },
            },
            {
                $unionWith: {
                    coll: "equipment",
                    pipeline: [
                        {
                            $addFields: {
                                type: "Equipment",
                                collection: "equipment",
                            },
                        },
                    ],
                },
            },
            {
                $lookup: {
                    from: "media",
                    localField: "mainImage",
                    foreignField: "_id",
                    as: "mainImageDetails",
                },
            },
            {
                $unwind: {
                    path: "$mainImageDetails",
                    preserveNullAndEmptyArrays: true,
                },
            },
            // Ajout d'un champ `type` à `mainImageDetails` si nécessaire
            /*{
                $addFields: {
                    'mainImageDetails.type': 'Media'
                }
            },*/
            // Fusion des détails dans `mainImage`
            {
                $set: {
                    mainImage: {
                        $cond: {
                            if: { $ne: ["$mainImageDetails", null] },
                            then: "$mainImageDetails",
                            else: "$mainImage",
                        },
                    },
                },
            },
            // Suppression du champ `mainImageDetails` si inutile
            {
                $project: {
                    mainImageDetails: 0,
                },
            },
        ];
        /*
            {
                $facet: {
                    paginatedResults: [
                        { $sort: { updatedAt: targetSort } },
                        { $skip: targetSkip },
                        { $limit: targetLimit }
                    ],
                    meta: [
                        { $count: 'count' }
                    ]
                }
            }
        */
        let allDocsPaginated;
        if (getApiConfig().environnement === "development") {
            allDocsPaginated = await paginationAggregation(
                this.personModel,
                aggregationPipeline,
                targetSkip,
                targetLimit,
                targetSort
            );
            //allDocsPaginated = await this.personModel.aggregate(aggregationPipeline).explain();
        } else {
            allDocsPaginated = await paginationAggregation(
                this.personModel,
                aggregationPipeline,
                targetSkip,
                targetLimit,
                targetSort
            );
        }

        /*//needed for simple layout
        $project: {
                    updatedAt: 1, type: {$literal: "Person"}, lastName: 1, firstName: 1, slug: 1, nickname: 1, occupations: 1, catchphrase: 1, badges: 1, meta: 1,
                   "mainImage.title": 1, "mainImage.alt": 1, "mainImage.url": 1,
                }
         */
        return allDocsPaginated;
    }

    private async _embedEntitiesCountInTaxonomy(document: any, results: Array<any>) {
        try {
            const currentCount: number = results.length;
            document.meta = {
                count: currentCount,
            };
            await document.save();
            LogHelper.info(`[Embedding] Taxonomy entities count ${currentCount} assign with ${document.name} taxonomy`);
        } catch (e: any) {
            throw new Error(e);
        }
    }
}

export default SearchResults;
