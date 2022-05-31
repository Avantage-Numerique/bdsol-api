import LogHelper from "../../Monitoring/Helpers/LogHelper"
import ServerController from "../../Server/Controllers/ServerController";
import LoginResponse from "../Responses/LoginResponse";
import {LogoutResponse} from "../Responses/LogoutResponse";
import UserAuthContract from "../Contracts/UserAuthContract";
import {TokenController} from "./TokenController";
import {UsersService, User, FakeUserModel} from "../../Users/UsersDomain";

import {ReasonPhrases, StatusCodes} from "http-status-codes";
import {ErrorResponse} from "../../Http/Responses/ErrorResponse";
import {PasswordsController} from "./PasswordsController";
import {SuccessResponse} from "../../Http/Responses/SuccessResponse";


class AuthentificationController
{

    public static service:UsersService;
    //user provider.

    constructor()
    {
        AuthentificationController.service = UsersService.getInstance(User.getInstance());

        if (AuthentificationController.service === undefined) {
            LogHelper.error("[AuthentificationController] Service is null in Authentification");
        }
    }


    public async login(username:string, password:string): Promise<LoginResponse>
    {
        // add encryption on send form till checking here.
        LogHelper.info(`${username} trying to connect ...`);

        //Authenticate the user with the creditentials
        const targetUser = await this.authenticate(username, password);

        // User was find in DB
        if (targetUser &&
            !targetUser.error &&
            targetUser.data !== null) {
            LogHelper.log(`Les information de ${targetUser.data.username} fonctionnent, génération du token JW ...`);

            // Generate an access token
            const data = {
                user: {
                    token: this.generateToken(targetUser.data)
                }
            };

            return  SuccessResponse.create(data, StatusCodes.OK, ReasonPhrases.OK);
        }

        return ErrorResponse.create(
            new Error(ReasonPhrases.UNAUTHORIZED),
            StatusCodes.UNAUTHORIZED,
            'Vos informations de connexion sont incorrectes, vérifiez votre utilisateur et votre mot de passe.'
        );
    }


    public async logout(username:string): Promise<LogoutResponse>
    {
        //set the logout process
        return {
            error: false,
            errors: [],
            code: StatusCodes.OK,
            message: `L'utilisateur ${username} a été déconnecté avec succès.`,
            data: {
                user: username,
            }
        };
    }


    /**
     *
     * @param user
     * @private
     */
    private generateToken(user:any):string
    {
        return TokenController.generate({ "user_id": `${user._id}`, "username": `${user.username}`, "role": `${user.role}` });
    }

    /**
     * search in the current database driver for the user.
     * @param username
     * @param password
     * @return {Promise} of type Any. Fakeusers driver is now
     * @private
     */
    private async authenticate(username:string, password:string): Promise<any>
    {
        const targetUser = {
            username: username
        } as UserAuthContract;

        try {
            LogHelper.info(`Vérification des informations fournis par ${username} ...`);
            if (ServerController.database.driverPrefix === 'mongodb')
            {
                const user = await AuthentificationController.service.get(targetUser);

                // If we find a user, we check the password through the hashing comparaison.
                if (!user.error && user.data.password !== undefined)
                {
                    if (await PasswordsController.matches(user.data.password, password)) {
                        return user;
                    }
                }
                return ErrorResponse.create(new Error("Connection refusée"), StatusCodes.UNAUTHORIZED);
            }

            // If we need to develop directly in node serveur running outside of docker.
            if (ServerController.database.driverPrefix === 'fakeusers')
            {
                return await FakeUserModel.findOne(targetUser);
            }
        }
        catch (errors: any)
        {
            return ErrorResponse.create(errors, StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }
}
export default AuthentificationController;