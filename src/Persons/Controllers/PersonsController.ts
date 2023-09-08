import Person from "../Models/Person"
import PersonsService from "../Services/PersonsService";
import AbstractController from "../../Abstract/Controller"
import {ApiResponseContract} from "@src/Http/Responses/ApiResponse";
import {ReasonPhrases, StatusCodes} from "http-status-codes";
import {SuccessResponse} from "@src/Http/Responses/SuccessResponse";
import ServiceAggregate from "@database/ServiceAggregate";
import {objectIdModifier} from "@database/QueryBuilder/PropertyModifier";

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

    public async aggregateOrgs(id:any): Promise<ApiResponseContract> {

        const PersonModel:any = Person.getInstance();
        /*const results:any = await PersonModel.aggregate([
            {
                $lookup: {
                    from: 'organisations',
                    localField: '_id',
                    foreignField: 'team.member',
                    as: 'org'
                }
            }
        ]).exec();*/

        const aggregateService = new ServiceAggregate(PersonModel);
        const results:any = await aggregateService.lookupFor(
            {
                _id: objectIdModifier(id)
            },
            {
                from: 'organisations',
                localField: '_id',
                foreignField: 'team.member',
                as: 'organisations'
            }
        );

        console.log(results);

        return SuccessResponse.create(
            results,
            StatusCodes.OK,
            ReasonPhrases.OK
        );
    }
}
export default PersonsController;