import AbstractModel from "@core/Model";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { ApiResponseContract } from "@src/Http/Responses/ApiResponse";
import { ErrorResponse } from "@src/Http/Responses/ErrorResponse";
import { SuccessResponse } from "@src/Http/Responses/SuccessResponse";

class OntologyController {
    /** @private @static Singleton instance */
    private static _instance: OntologyController;

    name: string = "Ontology";
    public appModel: AbstractModel;

    private constructor() {
        this.init();
    }

    public init() {
        this.name = "OntologyController";
    }

    /**
     * @public @static @method getInstance Create the singleton instance if not existing
     * @return {OntologyController} Controller singleton constructor
     */
    public static getInstance(): OntologyController {
        if (OntologyController._instance === undefined) {
            OntologyController._instance = new OntologyController();
        }
        return OntologyController._instance;
    }

    public async index(): Promise<ApiResponseContract> {
        try {
            return SuccessResponse.create({}, StatusCodes.OK, ReasonPhrases.OK);
        } catch (getAllErrors: any) {
            return ErrorResponse.create(getAllErrors, StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }
}

export default OntologyController;
