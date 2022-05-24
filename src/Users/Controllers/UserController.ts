import {User} from "../Models/User";
import LogHelper from "../../Monitoring/Helpers/LogHelper";
import type {ApiResponseContract} from "../../Http/Responses/ApiResponse";
import {StatusCodes, ReasonPhrases} from "http-status-codes";
import {ErrorResponse} from "../../Http/Responses/ErrorResponse";
import type {UserDocument} from "../Schemas/UserSchema";
import {UsersService} from "../Services/UsersService";
import type {Service} from "../../Database/Service";

/**
 * First pitch, in parallel with fred, for a crud controller.
 * Next step will be to create a CrudController, to abstract the core that will be designed here.
 */
export class UserController {

    public service:Service;

    constructor()
    {
        this.service = UsersService.getInstance(User.getInstance());//new UsersService(User.getInstance());
        if (this.service === undefined) {
            LogHelper.error("Service is null in UsersService");
        }
    }

    public async create(requestData:any):Promise<ApiResponseContract>
    {
        if (!this.validateData(requestData))
            return ErrorResponse.create(
                new Error(ReasonPhrases.BAD_REQUEST),
                StatusCodes.BAD_REQUEST,
                "Data non valide"
            );
        const formattedData = this.formatRequestDataForDocument(requestData);
        LogHelper.debug("userController", formattedData);
        const createdDocumentResponse:ApiResponseContract = await this.service.insert(formattedData);
        LogHelper.debug("userController", createdDocumentResponse);

        if (createdDocumentResponse !== undefined)
            return createdDocumentResponse;

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
     * @param id the document id of the user.
     * @param requestData the data to update.
     */
    public async update(id:string, requestData:any):Promise<ApiResponseContract>
    {
        if (!this.validateData(requestData)) {
            return ErrorResponse.create(
                new Error(ReasonPhrases.BAD_REQUEST),
                StatusCodes.BAD_REQUEST,
                "Data non valide"
            );
        }
        if (id === undefined || id.length != 24)
            return ErrorResponse.create(
                new Error(ReasonPhrases.BAD_REQUEST),
                StatusCodes.BAD_REQUEST,
                "id non valide"
            );


        const formattedData = this.formatRequestDataForDocument(requestData);
        const updatedModelResponse:any = await this.service.update(id, formattedData);

        if (updatedModelResponse !== undefined)
            return updatedModelResponse;


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

    public validateData(requestData:any):boolean
    {
        // get required data and format data
        // parsed them
        // Return if validation passed or not.

        LogHelper.log(`Validating ${typeof requestData}`, requestData);
        //first test
        return typeof requestData === 'object' &&
            requestData.username !== null &&
            requestData.username !== undefined &&
            typeof requestData.username === 'string';
    }

}