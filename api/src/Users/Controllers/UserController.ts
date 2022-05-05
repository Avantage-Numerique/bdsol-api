import {User, UserDocument, UsersService} from "../UsersDomain";

import LogHelper from "../../Monitoring/Helpers/LogHelper";
import {ApiResponseContract} from "../../Http/Responses/ApiResponse";
import HttpError from "../../Error/HttpError";

/**
 * First pitch, in parallel with fred, for a crud controller.
 * Next step will be to create a CrudController, to abstract the core that will be designed here.
 */
export class UserController {

    public service:UsersService;

    constructor() {
        this.service = UsersService.getInstance(User.getInstance());//new UsersService(User.getInstance());
        if (this.service === undefined) {
            LogHelper.error("Service is null in UsersService");
        }
    }

    public async create(requestData:any):Promise<ApiResponseContract>
    {
        if (!this.validateData(requestData)) {
            return HttpError.NotAcceptable();
        }

        let formattedData = this.formatRequestDataForDocument(requestData);
        let createdDocumentResponse:ApiResponseContract = await this.service.insert(formattedData);
        LogHelper.debug("userController", createdDocumentResponse);

        if (createdDocumentResponse !== undefined) {
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
    public async update(id:string, requestData:any):Promise<ApiResponseContract> {

        if (!this.validateData(requestData)) {
            return HttpError.NotAcceptable();
        }
        if (id === undefined) {
            return HttpError.NotAcceptable();
        }

        let formattedData = this.formatRequestDataForDocument(requestData);
        let updatedModelResponse:any = await this.service.update(id, formattedData);

        if (updatedModelResponse !== undefined) {
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