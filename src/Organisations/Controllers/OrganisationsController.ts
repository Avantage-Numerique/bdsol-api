import Organisation from "../Models/Organisation"
import OrganisationsService from "../Services/OrganisationsService";
import AbstractController from "../../Abstract/Controller"
import {ApiResponseContract} from "@src/Http/Responses/ApiResponse";
import {lookupModelsByQueries} from "@database/HelperAggregate";
import Project from "@src/Projects/Models/Project";
import Person from "@src/Persons/Models/Person";
import ServiceAggregate from "@database/ServiceAggregate";
import mongoose from "mongoose";
import {User} from "@src/Users/Models/User";
import Taxonomy from "@src/Taxonomy/Models/Taxonomy";
import Media from "@src/Media/Models/Media";
import {SuccessResponse} from "@src/Http/Responses/SuccessResponse";
import {ReasonPhrases, StatusCodes} from "http-status-codes";
import {ErrorResponse} from "@src/Http/Responses/ErrorResponse";
import Event from "@src/Events/Models/Event";
import Equipment from "@src/Equipment/Models/Equipment";
import Place from "@src/Places/Models/Place";

class OrganisationsController extends AbstractController {

    /** @private @static Singleton instance */
    private static _instance:AbstractController;

    /** @public OrganisationService */
    service:OrganisationsService;

    /** @public Model */
    entity:Organisation;

    constructor() {
        super();
        this.entity = Organisation.getInstance();
        this.service = OrganisationsService.getInstance(this.entity);
    }


    /**
     * @public @static @method getInstance Create the singleton instance if not existing 
     * @return {OrganisationsController} Controller singleton constructor
    */
    public static getInstance():AbstractController {
        if (OrganisationsController._instance === undefined) {
            OrganisationsController._instance = new OrganisationsController();
        }
        return OrganisationsController._instance;
    }


    public async single(requestData: any): Promise<ApiResponseContract> {
        return await this.aggregateSingle(requestData.slug);
    }

    public async aggregateSingle(slug:any): Promise<ApiResponseContract> {
        /**
         * regroup Linked entity from a 1:n relation where person is linked.
         * linkField : Property in the AppModel that
         */
        let query: Array<any> = lookupModelsByQueries([
            {
                appModel: Project.getInstance(),
                foreignField: "entityInCharge"
            },
            {
                appModel: Person.getInstance(),
                by: "team.member",
                foreignField: "_id",
                as: "people"
            },
            {
                appModel: Event.getInstance(),
                foreignField: "organizer"
            },
            {
                appModel: Equipment.getInstance(),
                by: "equipment.equipment",
                foreignField: "_id",
                as: "tools"
            },
            {
                appModel: Place.getInstance(),
                by: "location",
                foreignField: "_id",
                as: "location"
            },
            {
                raw: {
                    $addFields: {
                        "type": Organisation.getInstance().modelName
                    }
                }
            },
            {
                raw: {
                    $addFields: {
                        "projects.type": Project.getInstance().modelName,
                        "events.type": Event.getInstance().modelName,
                        "people.type": Person.getInstance().modelName,
                        "tools.type": Equipment.getInstance().modelName,//changed here before the $addfield in raw.
                        "location.type": Place.getInstance().modelName,
                        //"type": "$type",//test to get the virtual like that. Organisation.getInstance().modelName
                    }
                }
            },
            {
                raw: {  //reconstruction of the team array with the lookup values (as if we used the populate).
                    $addFields: {
                        team: {
                            $map: {
                                input: "$team",
                                as: "t",
                                in: {
                                    member: {
                                        $arrayElemAt: [
                                            {
                                                $filter: {
                                                    input: "$people",
                                                    as: "p",
                                                    cond: {$eq: ["$$p._id", "$$t.member"]}
                                                }
                                            },
                                            0
                                        ]
                                    },
                                    role: "$$t.role",
                                    subMeta: "$$t.subMeta",
                                }
                            }
                        }
                    }
                }
            },
            {
                raw: {  //reconstruction of the team array with the lookup values (as if we used the populate).
                    $addFields: {
                        equipment: {
                            $map: {
                                input: "$equipment",
                                as: "e",
                                in: {
                                    equipment: {
                                        $arrayElemAt: [
                                            {
                                                $filter: {
                                                    input: "$tools",
                                                    as: "t",
                                                    cond: {$eq: ["$$t._id", "$$e.equipment"]}
                                                }
                                            },
                                            0
                                        ],
                                    },
                                    qty: "$$e.qty",
                                    subMeta: "$$e.subMeta",
                                }
                            }
                        }
                    }
                }
            },
            {
                raw: {
                    $project: {
                        people: 0,
                        tools: 0
                    }
                }
            }
            //need to get back the people looked up into team.member.
        ]);

        const aggregateService = new ServiceAggregate(Organisation.getInstance());

        const results:any = await aggregateService.lookupMultiple({slug: slug}, query);

        //aggregation inter bd don't work (that I red).
        const users:mongoose.Model<any> = User.getInstance().mongooseModel;
        const taxonomies:mongoose.Model<any> = Taxonomy.getInstance().mongooseModel;
        const media:mongoose.Model<any> = Media.getInstance().mongooseModel;
        //const equipment:mongoose.Model<any> = Equipment.getInstance().mongooseModel;

        //await equipment.populate(results, {path: "equipment.equipment"});
        await taxonomies.populate(results, {path: "offers.skills"});
        await taxonomies.populate(results, {path: "domains.domain"});

        await media.populate(results, {path: "mainImage"});
        await media.populate(results, {path: "projects.mainImage"});
        await media.populate(results, {path: "team.member.mainImage"});
        await media.populate(results, {path: "events.mainImage"});
        await media.populate(results, {path: "equipment.equipment.mainImage"});

        await users.populate(results, {path: "meta.requestedBy", select: "name username avatar"});
        await users.populate(results, {path: "meta.lastModifiedBy", select: "name username avatar"});


        if (results.length > 0) {
            return SuccessResponse.create(
                results[0],
                StatusCodes.OK,
                ReasonPhrases.OK
            );
        }

        return ErrorResponse.create(
            new Error(""),
            StatusCodes.NOT_FOUND,
            ReasonPhrases.NOT_FOUND
        );
    }
}
export default OrganisationsController;