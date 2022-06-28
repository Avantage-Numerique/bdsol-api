import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { ApiResponseContract } from "../../Http/Responses/ApiResponse";
import { ErrorResponse } from "../../Http/Responses/ErrorResponse";
import {UsersService, User, UserContract} from "../../Users/UsersDomain";
import config from "../../config";


export class RegistrationController {

    /** @public PersonneService */
    public service:UsersService;
    public userModel:User;

    /** @constructor */
    constructor() {
        this.service = new UsersService(User.getInstance());
        this.userModel = User.getInstance();
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


        if (!createdDocumentResponse.error) {
            createdDocumentResponse.data = this.userModel.dataTransfertObject(createdDocumentResponse.data);
            //generate un token ? direct ?
            // ou on fait connecter l'utilisateur ?
            // Il faut faire le flow post inscription.
        }
        return createdDocumentResponse;
    }

    public validateData(data:any):any
    {
        let message = "validateData register";
        /*
        //pour appliquer la validation sur les données reçus.
        for (let property in UserValidation) {
            const rules:Array<string> = UserValidation[property];
            for (let property of rules) {

            }
        }
        */
        if (data !== undefined && data !== null) {
            let isValid = typeof data === 'object';
            isValid = data.name !== undefined && isValid;
            isValid = data.username !== undefined && isValid;
            isValid = data.email !== undefined && isValid;
            isValid = data.password !== undefined && isValid;
            isValid = typeof data.name === "string" && isValid;
            isValid = typeof data.username === "string" && isValid;
            isValid = typeof data.email === "string" && isValid;
            isValid = typeof data.password === "string" && isValid;

            return { isValid, message };
        }
        return false;
    }


    public formatRequestDataForDocument(data:any):UserContract {
        return {
            name: data.name,
            email: data.email,
            username: data.username,
            password: data.password,
            avatar: data.avatar,
            role: config.users.roles.default
        } as UserContract;
    }
}