import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { ApiResponseContract } from "../../Http/Responses/ApiResponse";
import { ErrorResponse } from "../../Http/Responses/ErrorResponse";
import LogHelper from "../../Monitoring/Helpers/LogHelper";
import {UsersService, User, UserDocument, UserValidation} from "../../Users/UsersDomain";
import config from "../../config";


export class RegistrationController {

    /** @public PersonneService */
    public service:UsersService;

    /** @constructor */
    constructor() {
        this.service = new UsersService(User.getInstance());
    }


    public async register(requestData:any):Promise<ApiResponseContract>
    {
        if (!this.validateData(requestData))
        {
            return ErrorResponse.create(
                new Error(ReasonPhrases.BAD_REQUEST),
                StatusCodes.BAD_REQUEST,
                "Data non valide"
            );
        }

        const formattedData = this.formatRequestDataForDocument(requestData);

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

    public validateData(data:any):any
    {
        let message = "validateData register";

        for (let property in UserValidation) {
            const rules:Array<string> = UserValidation[property];
            for (let property of rules) {

            }
        }

        let isValid = typeof data === 'object';
        isValid = data.name !== undefined && isValid;
        isValid = data.username !== undefined && isValid;
        isValid = data.password !== undefined && isValid;

        return { isValid, message };
    }


    public formatRequestDataForDocument(data:any):UserDocument {
        return {
            name: data.name,
            email: data.email,
            username: data.username,
            password: data.password,
            avatar: data.avatar,
            role: config.users.roles.default
        } as UserDocument;
    }
}