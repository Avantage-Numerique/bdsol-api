
import StaticContentsService from "../Services/StaticContentsService";
import StaticContent from "../Models/StaticContent";
import {ControllerContract} from "../../Abstract/Contracts/ControllerContract";
import {ApiResponseContract} from "../../Http/Responses/ApiResponse";
import {SuccessResponse} from "../../Http/Responses/SuccessResponse";
import {ReasonPhrases, StatusCodes} from "http-status-codes";
import {ErrorResponse} from "../../Http/Responses/ErrorResponse";
import AbstractModel from "../../Abstract/Model";


class StaticContentsController implements ControllerContract {

    /** @private @static Singleton instance */
    private static _instance: ControllerContract;

    /** @public PersonsService */
    service: StaticContentsService;

    /** @public Model */
    entity: StaticContent;

    name: string = "StaticContent";

    public model: any;//@todo create or find the best type for this.
    public appModel: AbstractModel;


    constructor() {
        this.entity = StaticContent.getInstance();
        this.service = StaticContentsService.getInstance(this.entity);
    }

    /**
     * @public @static @method getInstance Create the singleton instance if not existing
     * @return {ControllerContract} Controller singleton constructor
     */
    public static getInstance(): ControllerContract {
        if (StaticContentsController._instance === undefined) {
            StaticContentsController._instance = new StaticContentsController();
        }
        return StaticContentsController._instance;
    }


    /**
     * @method list List entity documents with research terms from database
     * @param {any} requestData - Research terms { "nom":"Jean" }
     * @return {ApiResponseContract} Promise containing a list of documents
     */
    public async getLicencesContent(requestData: any): Promise<ApiResponseContract> {

        try {
            const rawContent:any = require("../../Data/Licences/licences.json");

            if (rawContent !== null) {
                return SuccessResponse.create(rawContent, StatusCodes.OK, ReasonPhrases.OK);
            }

            return SuccessResponse.create({}, StatusCodes.OK, ReasonPhrases.OK);

        } catch (getAllErrors: any) {
            return ErrorResponse.create(getAllErrors, StatusCodes.INTERNAL_SERVER_ERROR);
        }

    }

}

export default StaticContentsController;