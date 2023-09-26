import Person from "../Models/Person"
import PersonsService from "../Services/PersonsService";
import AbstractController from "../../Abstract/Controller"
import {ApiResponseContract} from "@src/Http/Responses/ApiResponse";
import {ReasonPhrases, StatusCodes} from "http-status-codes";
import {SuccessResponse} from "@src/Http/Responses/SuccessResponse";
import ServiceAggregate from "@database/ServiceAggregate";
import QueryBuilder from "@database/QueryBuilder/QueryBuilder";
import {User} from "@src/Users/Models/User";
import mongoose from "mongoose";
import Taxonomy from "@src/Taxonomy/Models/Taxonomy";

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

    /**
     * @method list List entity documents with research terms from database
     * @param {any} requestData - Research terms { "nom":"Jean" }
     * @return {ApiResponseContract} Promise containing a list of documents
     */
    public async get(requestData: any): Promise<ApiResponseContract> {
        const query = QueryBuilder.build(requestData, true);

        //hijacking the get function for person to use aggregation instead.
        console.log("Persons controller get : ", requestData)


        console.log("This is my person controller");
        return await this.aggregateOrgs(requestData.slug);
    }

    public async aggregateOrgs(slug:any): Promise<ApiResponseContract> {

        const PersonModel:any = Person.getInstance();
        const aggregateService = new ServiceAggregate(PersonModel);

        const results:any = await aggregateService.lookupMultiple(
            {
                slug: slug
            },
            [
                {
                    $lookup: {
                        from: 'organisations',
                        localField: '_id',
                        foreignField: 'team.member',
                        as: 'organisations'
                    }
                },
                {
                    $lookup: {
                        from: 'projects',
                        localField: '_id',
                        foreignField: 'team.member',
                        as: 'projects'
                    }
                },
                {
                    $lookup: {
                        from: 'taxonomies',
                        localField: 'domains.domain',
                        foreignField: '_id',
                        as: 'domains'
                    }
                }
            ]
        );



        console.log("results", results);

        const users:mongoose.Model<any> = User.getInstance().mongooseModel;
        const taxonomies:mongoose.Model<any> = Taxonomy.getInstance().mongooseModel;
        await users.populate(results, {path: "meta.requestedBy", select: "name username avatar"});
        await users.populate(results, {path: "meta.lastModifiedBy", select: "name username avatar"});
        //I'm doing it with populate because of the $lookup is just really far fetch.
        // All the things I found and tests where not working
        await taxonomies.populate(results, {path: "occupations.skills"});

        if (results.length > 0) {
            return SuccessResponse.create(
                results[0],
                StatusCodes.OK,
                ReasonPhrases.OK
            );
        }
        return SuccessResponse.create(
            results[0],
            StatusCodes.OK,
            ReasonPhrases.OK
        );
    }
}
export default PersonsController;