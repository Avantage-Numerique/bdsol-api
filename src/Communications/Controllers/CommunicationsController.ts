import { ApiResponseContract } from "@src/Http/Responses/ApiResponse";
import AbstractController from "../../Abstract/Controller"
import Communication from "../Models/Communication";
import CommunicationsService from "../Services/CommunicationsService";
import { ErrorResponse } from "@src/Http/Responses/ErrorResponse";
import { ReasonPhrases, StatusCodes } from "http-status-codes";


class CommunicationsController extends AbstractController {

    /** @private @static Singleton instance */
    private static _instance:AbstractController|CommunicationsController;

    /** @public PersonsService */
    service:CommunicationsService;

    /** @public Model */
    entity:Communication;

    constructor() {
        super();
        this.entity = Communication.getInstance();
        this.service = CommunicationsService.getInstance(this.entity);
    }

    /**
     * @public @static @method getInstance Create the singleton instance if not existing 
     * @return {CommunicationsController} Controller singleton constructor
    */
    public static getInstance():AbstractController|CommunicationsController {
        if (CommunicationsController._instance === undefined) {
            CommunicationsController._instance = new CommunicationsController();
        }
        return CommunicationsController._instance;
    }

    /**
     * @method create Create a new entity in de database based on the request.
     * @param {any} requestData - Containing information for the create
     * @return {ApiResponseContract} Promise
     */
    public async create(requestData: any): Promise<ApiResponseContract> {
        const {name, email, message} = requestData;
        const communicationObject = { name: name, email: email, message: message}
        const createdDocumentResponse = await this.service.insert(communicationObject);

        if (createdDocumentResponse !== undefined)
            return createdDocumentResponse;

        return ErrorResponse.create(
            new Error(ReasonPhrases.INTERNAL_SERVER_ERROR),
            StatusCodes.INTERNAL_SERVER_ERROR,
            'Service returned an undefined response from insert'
        );
    }
}

export default CommunicationsController;
