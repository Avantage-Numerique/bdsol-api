import AbstractController from "@core/Controller";
import EquipmentService from "@src/Equipment/Services/EquipmentService";
import Equipment from "@src/Equipment/Models/Equipment";
import {ApiResponseContract} from "@src/Http/Responses/ApiResponse";
import {lookupModelsByQueries} from "@database/HelperAggregate";
import Project from "@src/Projects/Models/Project";
import Organisation from "@src/Organisations/Models/Organisation";
import ServiceAggregate from "@database/ServiceAggregate";
import mongoose from "mongoose";
import {User} from "@src/Users/Models/User";
import Taxonomy from "@src/Taxonomy/Models/Taxonomy";
import Media from "@src/Media/Models/Media";
import {SuccessResponse} from "@src/Http/Responses/SuccessResponse";
import {ReasonPhrases, StatusCodes} from "http-status-codes";
import {ErrorResponse} from "@src/Http/Responses/ErrorResponse";

class EquipmentController extends AbstractController {

    /** @private @static Singleton instance */
    private static _instance: AbstractController;

    /** @public PersonsService */
    service: EquipmentService;

    /** @public Model */
    entity: Equipment;

    name: string = "Equipment";

    constructor() {
        super();
        this.entity = Equipment.getInstance();
        this.service = EquipmentService.getInstance(this.entity);
    }

    /**
     * @public @static @method getInstance Create the singleton instance if not existing
     * @return {EquipmentController} Controller singleton constructor
     */
    public static getInstance(): AbstractController {
        if (typeof EquipmentController._instance === "undefined") {
            EquipmentController._instance = new EquipmentController();
        }
        return EquipmentController._instance;
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
                appModel: Organisation.getInstance(),
                foreignField: "equipment.equipment"
            },
            {
                appModel: Project.getInstance(),
                foreignField: "equipment"
            }
            //need to get back the people looked up into team.member.
        ]);

        query.push({// Virtuals
            $addFields: {
                "type": Equipment.getInstance().modelName,
                "organisations.type": Organisation.getInstance().modelName,
                "projects.type": Project.getInstance().modelName
            }
        });

        const aggregateService = new ServiceAggregate(Equipment.getInstance());

        const results:any = await aggregateService.lookupMultiple({slug: slug}, query);

        //agregation inter bd don't work (that I red).
        const users:mongoose.Model<any> = User.getInstance().mongooseModel;
        const taxonomies:mongoose.Model<any> = Taxonomy.getInstance().mongooseModel;
        const media:mongoose.Model<any> = Media.getInstance().mongooseModel;

        await taxonomies.populate(results, {path: "domains.domain"});
        await taxonomies.populate(results, {path: "equipmentType"});

        await media.populate(results, {path: "mainImage"});
        await media.populate(results, {path: "organisations.mainImage"});
        await media.populate(results, {path: "projects.mainImage"});

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

export default EquipmentController;