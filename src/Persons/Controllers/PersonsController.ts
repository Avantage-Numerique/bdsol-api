import Person from "../Models/Person"
import PersonsService from "../Services/PersonsService";
import AbstractController from "../../Abstract/Controller"
import {ApiResponseContract} from "@src/Http/Responses/ApiResponse";
import {ReasonPhrases, StatusCodes} from "http-status-codes";
import {SuccessResponse} from "@src/Http/Responses/SuccessResponse";
import ServiceAggregate from "@database/ServiceAggregate";
import {User} from "@src/Users/Models/User";
import mongoose from "mongoose";
import Taxonomy from "@src/Taxonomy/Models/Taxonomy";
import {ErrorResponse} from "@src/Http/Responses/ErrorResponse";
import Organisation from "@src/Organisations/Models/Organisation";
import Project from "@src/Projects/Models/Project";
import {lookupModelsByQueries} from "@database/HelperAggregate";
import Media from "@src/Media/Models/Media";
import Event from "@src/Events/Models/Event";

class PersonsController extends AbstractController {

    /** @private @static Singleton instance */
    private static _instance:AbstractController|PersonsController;

    /** @public PersonsService */
    service:PersonsService;

    /** @public Model */
    entity:Person;

    constructor() {
        super();
        this.entity = Person.getInstance();
        this.service = PersonsService.getInstance(this.entity);
    }

    /**
     * @public @static @method getInstance Create the singleton instance if not existing 
     * @return {PersonsController} Controller singleton constructor
    */
    public static getInstance():AbstractController|PersonsController {
        if (PersonsController._instance === undefined) {
            PersonsController._instance = new PersonsController();
        }
        return PersonsController._instance;
    }

    public async single(requestData: any): Promise<ApiResponseContract> {
        return await this.aggregateSingle(requestData.slug);
    }

    /**
     Ideas
     Get population from pre events ?
     Aggregate relation on prevents ?
     */

    public async aggregateSingle(slug:any): Promise<ApiResponseContract> {

        /**
         * regroup Linked entity from a 1:n relation where person is linked.
         * linkField : Property in the AppModel that
         */
        let query: Array<any> = lookupModelsByQueries([
            {
                appModel: Organisation.getInstance(),
                foreignField: "team.member"
            },
            {
                appModel: Project.getInstance(),
                foreignField: "team.member"
            },
            {
                appModel: Event.getInstance(),
                foreignField: "attendees"
            }
        ]);

        query.push({// Virtuals
            $addFields: {
                "organisations.type": Organisation.getInstance().modelName,
                "projects.type": Project.getInstance().modelName,
                "events.type": Event.getInstance().modelName,
                "type": Person.getInstance().modelName
            }
        });

        const aggregateService = new ServiceAggregate(Person.getInstance());

        const results:any = await aggregateService.lookupMultiple({slug: slug}, query);

        //agregation inter bd don't work (that I red).
        const users:mongoose.Model<any> = User.getInstance().mongooseModel;

        //I'm doing it with populate because of the $lookup is just really fetching, and we need data to stay the same.
        // All the things I found and tests where not working
        const taxonomies:mongoose.Model<any> = Taxonomy.getInstance().mongooseModel;

        const media:mongoose.Model<any> = Media.getInstance().mongooseModel;
        await taxonomies.populate(results, {path: "occupations.skills"});
        await taxonomies.populate(results, {path: "domains.domain"});

        await media.populate(results, {path: "projects.mainImage"});
        await media.populate(results, {path: "organisations.mainImage"});
        await media.populate(results, {path: "mainImage"});
        await media.populate(results, {path: "events.mainImage"});

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

export default PersonsController;
