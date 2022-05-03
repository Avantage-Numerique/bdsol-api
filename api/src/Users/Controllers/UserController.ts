import User from "../Models/User";
import {UserDocument} from "../Schemas/UserSchema";
import UsersService from "../Services/UsersService";
import {StatusCodes} from "http-status-codes";
import { Error } from "../../Error/Error";
import LogHelper from "../../Monitoring/Helpers/LogHelper";
import {ApiResponseContract} from "../../Http/Responses/ApiResponse";
import {HttpError} from "../../Error/HttpError";

/**
 * First pitch, in parallele with fred, for a crud controller.
 * Next step will be to create a CrudController, to abstract the core that will be designed here.
 */
export default class UserController {

    public service:UsersService;

    constructor() {
        this.service = new UsersService(User.getInstance());
    }

    public async create(requestData:any):Promise<ApiResponseContract> {
        if (!this.validateData(requestData)) {
            return HttpError.NotAcceptable();
        }

        let formatedData = this.formatRequestDataForDocument(requestData);
        let createdDocumentResponse:ApiResponseContract = await this.service.insert(formatedData);

        if (createdDocumentResponse !== undefined &&
            !createdDocumentResponse.error) {

            return createdDocumentResponse;
        }

        return HttpError.NotAcceptable('Les données semblent être ok, mais la création n\'a pas eu lieu.');
    }


    /**
     * Update the user information
     * Password shall now be updated this way.
     * @todo add error if password is added here.
     * @param id the document id of the user.
     * @param requestData the data to update.
     */
    public async update(id:string, requestData:any):Promise<ApiResponseContract>  {

        LogHelper.info("Validating resquestData");
        if (!this.validateData(requestData)) {
            return HttpError.NotAcceptable();
        }
        LogHelper.info("ID is ok ?");
        if (id === undefined) {
            return HttpError.NotAcceptable();
        }
        LogHelper.info("Format the resquestData", requestData);
        let formatedData = this.formatRequestDataForDocument(requestData);

        LogHelper.info("Trying to update user from the serivce", formatedData);
        let updatedModelResponse:any = await this.service.update(id, formatedData);

        LogHelper.info("Controller response : ", updatedModelResponse);
        if (updatedModelResponse !== undefined &&
            !updatedModelResponse.error) {

            return updatedModelResponse;
        }

        return HttpError.NotAcceptable('Les données semblent être ok, mais la mise à jour n\'a pas eu lieu.');
    }

    public get(requestData:any) {
        return requestData !== undefined;
    }

    public delete(userID:string) {
        return userID !== undefined;
    }

    public formatRequestDataForDocument(requestData:any) {
        return {
            username: requestData.username,
            email: requestData.email,
            password: requestData.password,
            name: requestData.name,
            role: requestData.role,
            avatar: requestData.avatar
        } as UserDocument;
    }

    public userCreationFailed($message:string = 'Impossible de créé l\'utilsiateur.'):ApiResponseContract {
        return {
            error: true,
            code: StatusCodes.NOT_ACCEPTABLE,
            message: $message,
            errors: [],
            data: {}
        } as ApiResponseContract;
    }

    public validateData(requestData:any):boolean {
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