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
                raw: {
                    $project: {
                        people: 0
                    }
                }
            }
            //need to get back the people looked up into team.member.
        ]);

        query.push({// Virtuals
            $addFields: {
                "projects.type": Project.getInstance().modelName,
                "team.member.type": Person.getInstance().modelName,
                "type": Organisation.getInstance().modelName
            }
        });

        const aggregateService = new ServiceAggregate(Organisation.getInstance());

        const results:any = await aggregateService.lookupMultiple({slug: slug}, query);

        //agregation inter bd don't work (that I red).
        const users:mongoose.Model<any> = User.getInstance().mongooseModel;
        const taxonomies:mongoose.Model<any> = Taxonomy.getInstance().mongooseModel;
        const media:mongoose.Model<any> = Media.getInstance().mongooseModel;

        await taxonomies.populate(results, {path: "offers.skills"});
        await taxonomies.populate(results, {path: "domains.domain"});

        await media.populate(results, {path: "projects.mainImage"});
        await media.populate(results, {path: "team.member.mainImage"});

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