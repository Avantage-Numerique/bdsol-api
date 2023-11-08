import StaticContentsService from "@src/StaticContent/Services/StaticContentsService";
import StaticContent from "@src/StaticContent/Models/StaticContent";
import {ControllerContract} from "@core/Contracts/ControllerContract";
import {ApiResponseContract} from "@src/Http/Responses/ApiResponse";
import {SuccessResponse} from "@src/Http/Responses/SuccessResponse";
import {ReasonPhrases, StatusCodes} from "http-status-codes";
import {ErrorResponse} from "@src/Http/Responses/ErrorResponse";
import AbstractModel from "@core/Model";
import LicencesData from "@src/Data/Licences/LicencesData";


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

    public dataFolder:string = "../../Data/";

    public licences:any

    constructor() {
        this.entity = StaticContent.getInstance();
        this.service = StaticContentsService.getInstance(this.entity);
        this._loadStaticData();
    }


    private _loadStaticData() {
        if (LicencesData !== undefined) {
            this.licences = LicencesData.raw();
        }
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
            if (this.licences !== null) {
                return SuccessResponse.create(this.licences, StatusCodes.OK, ReasonPhrases.OK);
            }
            return SuccessResponse.create({}, StatusCodes.OK, ReasonPhrases.OK);

        } catch (getAllErrors: any) {
            return ErrorResponse.create(getAllErrors, StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }


    /**
     * @method list List entity documents with research terms from database
     * @param {string} licenceSlug - Research terms { "nom":"Jean" }
     * @return {ApiResponseContract} Promise containing a list of documents
     */
    public async getTargetLicenceContent(licenceSlug: string): Promise<ApiResponseContract> {

        try {
            const targetLicence:any = this.licences[licenceSlug];

            return targetLicence !== null && targetLicence !== undefined && targetLicence !== "" ?
                SuccessResponse.create(targetLicence, StatusCodes.OK, ReasonPhrases.OK) :
                ErrorResponse.create(new Error(ReasonPhrases.NOT_FOUND), StatusCodes.NOT_FOUND);

        } catch (getAllErrors: any) {
            return ErrorResponse.create(getAllErrors, StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

}

export default StaticContentsController;