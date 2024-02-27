import {ApiResponseContract} from "@src/Http/Responses/ApiResponse";
import AbstractController from "../../Abstract/Controller"
import Communication from "../Models/Communication";
import CommunicationsService from "../Services/CommunicationsService";
import {ErrorResponse} from "@src/Http/Responses/ErrorResponse";
import {ReasonPhrases, StatusCodes} from "http-status-codes";
import config from "@src/config";
import {EmailContactUsReceivedContent} from "@src/Templates/Contents/EmailContactUsReceivedContent";
import EmailNotification from "@src/Notifications/EmailNotification";
import { EmailAdminNotification } from "@src/Templates/Contents/EmailAdminNotification";


class CommunicationsController extends AbstractController {

    /** @private @static Singleton instance */
    private static _instance:AbstractController | CommunicationsController;

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
     * @method createContactUs Create a new communication in the database based on the request.
     * @param {any} requestData - Containing information for the create
     * @return {ApiResponseContract} Promise
     */
    public async createContactUs(requestData: any): Promise<ApiResponseContract> {
        const {name, email, message} = requestData;
        const communicationObject = { communicationType: "contact-us", name: name, email: email, message: message}
        const createdDocumentResponse = await this.service.insert(communicationObject);

        if (createdDocumentResponse !== undefined)
        {
            //Send email to notify that we received message and will respond asap
            const contactUsReceivedEmail:EmailNotification = new EmailNotification(
                {
                    recipient: email,
                    subject: name+", Nous avons bien reçu votre commentaire"
                },
                EmailContactUsReceivedContent(name, config.frontendAppUrl)
            );
            contactUsReceivedEmail.send();
            const adminNotificationOfContactUs:EmailNotification = new EmailNotification(
                {
                    recipient: "bonjour@avnu.ca", //Add email config
                    subject: "Nouveau message nous-joindre"
                },
                EmailAdminNotification(createdDocumentResponse.data)
            );
            adminNotificationOfContactUs.send();

            return createdDocumentResponse;
        }

        return ErrorResponse.create(
            new Error(ReasonPhrases.INTERNAL_SERVER_ERROR),
            StatusCodes.INTERNAL_SERVER_ERROR,
            'Service returned an undefined response from insert'
        );
    }

    /**
     * @method createReportEntity Create a new report in the database based on the request.
     * @param {any} requestData - Containing information for the create
     * @param {ObjectId} userId - Contains user objectId if connected, or undefined if not connected.
     * @param {string} ip - visitor ip of the incoming report request
     * @return {ApiResponseContract} Promise
     */
    public async createReportEntity(requestData: any, userId:any, ip:string): Promise<ApiResponseContract> {
        const {message, reportedEntityId, reportedEntityType} = requestData;
        const communicationObject =
        {
            communicationType: "report",
            message: message,
            reportedEntityId: reportedEntityId,
            reportedEntityType: reportedEntityType,
            userInfo: {
                userId: userId ?? null,
                ip: ip ?? "not-set"
            }

        }
        const createdDocumentResponse = await this.service.insert(communicationObject);

        if (createdDocumentResponse !== undefined){
            const adminNotificationOfReport:EmailNotification = new EmailNotification(
                {
                    recipient: "bonjour@avnu.ca", //Add email config
                    subject: "Nouveau signalement"
                },
                EmailAdminNotification(createdDocumentResponse.data)
            );
            adminNotificationOfReport.send();   
            return createdDocumentResponse;
        }

        return ErrorResponse.create(
            new Error(ReasonPhrases.INTERNAL_SERVER_ERROR),
            StatusCodes.INTERNAL_SERVER_ERROR,
            'Service returned an undefined response from insert'
        );
    }
}

export default CommunicationsController;
