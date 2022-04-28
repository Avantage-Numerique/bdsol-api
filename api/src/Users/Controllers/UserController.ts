import User from "../Models/User";
import {UserDocument} from "../Schemas/UserSchema";
import UsersService from "../Services/UsersService";
import {StatusCodes} from "http-status-codes";
import LogHelper from "../../Monitoring/Helpers/LogHelper";
import {ApiResponseContract} from "../../Http/Responses/ApiResponse";

/**
 * First pitch, in parallele with fred, for a crud controller.
 * Next step will be to create a CrudController, to abstract the core that will be designed here.
 */
export default class UserController {

    public service:UsersService;

    constructor() {
        this.service = new UsersService(User.getInstance());
    }

    /**
     * Créer un nouvel utilisateur
     * @param requestData any un object ou un object prémâcher
     */
    public async create(requestData:any):Promise<ApiResponseContract> {

        if (!this.validateData(requestData)) {
            return this.errorNotAcceptable();
        }

        let formatedData = this.formatRequestDataForDocument(requestData);
        //let createdDocumentResponse:ApiResponseContract =

        /*if (createdDocumentResponse !== undefined &&
            !createdDocumentResponse.error) {

        }*/

        return await this.service.insert(formatedData);
        //return this.errorNotAcceptable('Les données semblent être ok, mais la création n\'a pas eu lieu.');
    }


    /**
     * Update the user information
     * Password shall now be updated this way.
     * @todo add error if password is added here.
     * @param requestData the data to update.
     */
    public async update(requestData:any):Promise<ApiResponseContract>  {

        if (requestData.id === undefined) {
            return this.errorNotAcceptable("Il faut absolument le id de l'utilisateur pour mettre à jour ses informations.");
        }

        if (!this.validateData(requestData)) {
            return this.errorNotAcceptable("Les données sont dans un format erronés.");
        }

        let formatedData = this.formatRequestDataForDocument(requestData);

        let updatedModelResponse:ApiResponseContract = await this.service.update(requestData.id, formatedData);
        LogHelper.warn("UserController update", updatedModelResponse);
        if (updatedModelResponse !== undefined) {
            return updatedModelResponse;
        }

        return this.errorNotAcceptable('Les données semblent être ok, mais la mise à jour n\'a pas eu lieu.');
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


    public errorNotAcceptable($message:string = 'Les données partagées sont erronées ou manquantes.'):ApiResponseContract {
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

        LogHelper.info(`Validating data in UserController for a : ${typeof requestData}`, requestData);
        //first test
        return typeof requestData === 'object' &&
            requestData.username !== null &&
            requestData.username !== undefined &&
            typeof requestData.username === 'string';
    }

}