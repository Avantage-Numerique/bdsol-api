import {User} from "../Models/User";
import LogHelper from "../../Monitoring/Helpers/LogHelper";
import type {ApiResponseContract} from "../../Http/Responses/ApiResponse";
import {StatusCodes, ReasonPhrases} from "http-status-codes";
import {ErrorResponse} from "../../Http/Responses/ErrorResponse";
import type {UserDocument} from "../Schemas/UserSchema";
import {UsersService} from "../Services/UsersService";
import type {Service} from "../../Database/Service";
import Validator from "../../Validation/Validator";

/**
 * First pitch, in parallel with fred, for a crud controller.
 * Next step will be to create a CrudController, to abstract the core that will be designed here.
 */
export class UserController {

    public service:Service;
    public validator = new Validator();

    constructor()
    {
        this.service = UsersService.getInstance(User.getInstance());//new UsersService(User.getInstance());
        if (this.service === undefined) {
            LogHelper.error("Service is null in UsersService");
        }
    }

    public async create(requestData:any):Promise<ApiResponseContract>
    {
        const messageValidate = this.validator.validateData(requestData, User.concatRuleSet("create"));
        if (!messageValidate.isValid)
        return ErrorResponse.create(
            new Error(ReasonPhrases.BAD_REQUEST),
            StatusCodes.BAD_REQUEST,
            messageValidate.message
            );
            
            const formattedData = this.formatRequestDataForDocument(requestData);
            LogHelper.debug("userController", formattedData);
            const createdDocumentResponse:ApiResponseContract = await this.service.insert(formattedData);
            LogHelper.debug("userController", createdDocumentResponse);
            
            if (createdDocumentResponse !== undefined)
                return createdDocumentResponse;
    
            LogHelper.debug("Le code manque de robustesse. Users/create");
            return ErrorResponse.create(
                new Error(ReasonPhrases.INTERNAL_SERVER_ERROR),
                StatusCodes.INTERNAL_SERVER_ERROR,
                'Les données semblent être ok, mais la création n\'a pas eu lieu.'
                );
    }


    /**
     * Update the user information
     * Password shall now be updated this way.
     * @todo add error if password is added here.
     * @param requestData the data to update.
     */
    public async update(requestData:any):Promise<ApiResponseContract>
    {
        //Validation des données
        const messageUpdate = this.validator.validateData(requestData, User.concatRuleSet("update"));
        if (!messageUpdate.isValid)
            return ErrorResponse.create(
                new Error(ReasonPhrases.BAD_REQUEST),
                StatusCodes.BAD_REQUEST,
                messageUpdate.message
                );

        const formattedData = this.formatRequestDataForDocument(requestData);
        const updatedModelResponse:any = await this.service.update(requestData.id, formattedData);

        if (updatedModelResponse !== undefined)
            return updatedModelResponse;

        LogHelper.debug("Le code manque de robustesse. Users/update");
        return ErrorResponse.create(
            new Error(ReasonPhrases.INTERNAL_SERVER_ERROR),
            StatusCodes.INTERNAL_SERVER_ERROR,
            'Les données semblent être ok, mais la mise à jour n\'a pas eu lieu.'
            );
    }

    public get(requestData:any) {
        return requestData !== undefined;
    }

    public delete(userID:string) {
        return userID !== undefined;
    }

    public formatRequestDataForDocument(requestData:any)
    {
        return {
            username: requestData.username,
            email: requestData.email,
            password: requestData.password,
            name: requestData.name,
            role: requestData.role,
            avatar: requestData.avatar
        } as UserDocument;
    }
}