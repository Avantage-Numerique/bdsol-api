import LogHelper from "../../Monitoring/Helpers/LogHelper"
import ServerController from "../../Server/Controllers/ServerController";
import LoginResponse from "../Responses/LoginResponse";
import {LogoutResponse} from "../Responses/LogoutResponse";
import UserAuthContract from "../Contracts/UserAuthContract";
import {TokenController} from "./TokenController";
import {User, UsersService} from "../../Users/UsersDomain";
import {ReasonPhrases, StatusCodes} from "http-status-codes";
import {ErrorResponse} from "@src/Http/Responses/ErrorResponse";
import {PasswordsController} from "./PasswordsController";
import {SuccessResponse} from "@src/Http/Responses/SuccessResponse";
import {ApiResponseContract} from "@src/Http/Responses/ApiResponse";
import config from "../../config";


class AuthentificationController
{

    /** @private @static Singleton instance */
    private static _instance:AuthentificationController;


    public service:UsersService;
    public userModel:User;


    constructor()
    {
        this.userModel = User.getInstance();
        this.service = UsersService.getInstance(this.userModel);

        if (this.service === undefined) {
            LogHelper.error("[AuthentificationController] Service is null in Authentification");
        }
    }


    /**
     * @public @static @method getInstance Create the singleton instance if not existing
     * @return {AuthentificationController} Controller singleton constructor
     */
    public static getInstance():AuthentificationController {
        if (AuthentificationController._instance === undefined) {
            AuthentificationController._instance = new AuthentificationController();
        }
        return AuthentificationController._instance;
    }

    /**
     * Login method that is use directly in the auth route
     * @param username {string}
     * @param password {string}
     */
    public async login(username:string, password:string): Promise<LoginResponse>
    {
        // add encryption on send form till checking here.
        LogHelper.info(`${username} trying to connect ...`);
        
        //Authenticate the user with the creditentials
        const targetUser = await this.authenticate(username, password);
        
        // User was find in DB
        if (targetUser &&
            !targetUser.error &&
            targetUser.data !== null)
        {
            LogHelper.info(`Les information de ${targetUser.data.username} fonctionnent, génération du token JW ...`);

            // Generate an access token
            const data:any = this.userModel.dataTransfertObject(targetUser.data);
            data.token = TokenController.generateUserToken(this.userModel.dataTransfertObject(targetUser.data));
            data.tokenVerified = true;

            return  SuccessResponse.create(
                { user: data },
                StatusCodes.OK,
                ReasonPhrases.OK
            );
        }

        return ErrorResponse.create(
            new Error(ReasonPhrases.UNAUTHORIZED),
            StatusCodes.UNAUTHORIZED,
            'Vos informations de connexion sont incorrectes, vérifiez votre utilisateur et votre mot de passe.'
        );
    }

    /**
     * Fake logout since we can't invalidate the token.
     * @param username
     */
    public async logout(username:string): Promise<LogoutResponse>
    {
        //réponse uniform
        return SuccessResponse.create(
            { user: username },
            StatusCodes.OK,
            `L'utilisateur ${username} a été déconnecté avec succès.`
        );
    }

    /**
     * Token verification method, use in the authentification middleware.
     * @param token {string}
     */
    public async verifyToken(token:string): Promise<ApiResponseContract>
    {
        if (ServerController.database.driverPrefix === 'mongodb')
        {
            try {
                    const decoded:any = await TokenController.verify(token);

                    // If we find a user, we check the password through the hashing comparaison.
                    if (decoded && !decoded.error) {
                        return  SuccessResponse.create({tokenVerified:true}, StatusCodes.OK, ReasonPhrases.OK);
                    }
                    return ErrorResponse.create(new Error("Connection refusée"), StatusCodes.UNAUTHORIZED);
            }
            catch (error: any)
            {
                return ErrorResponse.create(error, StatusCodes.UNAUTHORIZED);
            }
        }
        return ErrorResponse.create(new Error("DB driver don't support verifing token"), StatusCodes.NOT_IMPLEMENTED);
    }


    public async register(requestData:any): Promise<ApiResponseContract>
    {
        const createdDocumentResponse = await this.service.insert(requestData);

        if (createdDocumentResponse !== undefined)
            return createdDocumentResponse;

        return ErrorResponse.create(
            new Error(ReasonPhrases.INTERNAL_SERVER_ERROR),
            StatusCodes.INTERNAL_SERVER_ERROR,
            'Service returned an undefined response from insert'
        );
    }


    public async generateToken(): Promise<string>
    {
        if (config.isDevelopment)
        {
            const devUser:any = await this.service.model.findOne({username: "datageek"});
            return TokenController.generateUserToken(this.userModel.dataTransfertObject(devUser));
        }
        return "";
    }


    /**
     * search in the current database driver for the user.
     * @param username
     * @param password
     * @return {Promise} of type Any.
     * @private
     */
    private async authenticate(username:string, password:string): Promise<any>
    {
        const targetUser = {
            username: username
        } as UserAuthContract;

        try
        {
            LogHelper.info(`Vérification des informations fournis par ${username} ...`);
            if (ServerController.database.driverPrefix === 'mongodb')
            {
                //Note: Service removed password with the DTO, soo we used mongooseModel directly
                //Refactoring : We should manage internal and external responses seperately in different services ...
                const user = await User.getInstance().mongooseModel.findOne(targetUser).lean();
                let response:any;
                if (user !== null) {
                    response = SuccessResponse.create(user, StatusCodes.OK, ReasonPhrases.OK);
                }
    
                // If we find a user, we check the password through the hashing comparaison.
                if (!response.error && response.data.password !== undefined)
                {
                    if (await PasswordsController.matches(response.data.password, password)) {
                        return response;
                    }
                }
                return ErrorResponse.create(new Error("Connection refusée"), StatusCodes.UNAUTHORIZED);
            }
        }
        catch (errors: any)
        {
            return ErrorResponse.create(errors, StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }
}
export default AuthentificationController;