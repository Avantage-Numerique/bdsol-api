import {UserContract} from "../../Users/Models/User";
import LogHelper from "../../Monitoring/Helpers/LogHelper"
import ServerController from "../../Server/Controllers/ServerController";
import LoginResponse from "../Responses/LoginResponse";
import {LogoutResponse} from "../Responses/LogoutResponse";
import UserAuthContract from "../Contracts/UserAuthContract";
import {TokenController} from "./TokenController";
import {UsersService, User, FakeUserModel} from "../../Users/UsersDomain";

import {StatusCodes} from "http-status-codes";
import {ErrorResponse} from "../../Http/Responses/ErrorResponse";


class AuthentificationController
{

    public static service:UsersService;
    //user provider.

    constructor()
    {
        AuthentificationController.service = UsersService.getInstance(User.getInstance());//new UsersService(User.getInstance());

        if (AuthentificationController.service === undefined) {
            LogHelper.error("[AuthentificationController] Service is null in Authentification");
        }
    }


    public async login(username:string, password:string): Promise<LoginResponse>
    {
        //AuthentificationController.service = UsersService.getInstance(User.getInstance());//new UsersService(User.getInstance());

        // add encryption on send form till checking here.
        LogHelper.info(`${username} trying to connect ...`);

        // TEMP DB BYPASS to make this working quicker.
        const targetUser = await this.authenticate(username, password);

        // User was find in DB
        if (!targetUser.error) {

            LogHelper.log(`Les information de ${targetUser.data.username} fonctionnent, génération du token JW ...`);

            // Generate an access token
            const userConnectedToken = this.generateToken(targetUser);

            return {
                error: false,
                userConnectedToken: userConnectedToken,
                code: StatusCodes.OK,
                errors: [],
                message: 'OK',
                data: {
                    userConnectedToken: userConnectedToken,
                    fields: {
                        username: true,
                        password: true
                    }
                }
            };
        }

        return {
            error: true,
            userConnectedToken: undefined,
            code: StatusCodes.UNAUTHORIZED,
            errors: [],
            message: 'Vos informations de connexion sont incorrectes, vérifiez votre utilisateur et mot de passe.',
            data: {
                userConnectedToken: undefined,
                fields: {
                    username: {
                        status: false,
                        message: ''
                    },
                    password:  {
                        status: false,
                        message: ''
                    }
                }
            }
        };
    }


    public async logout(username:string): Promise<LogoutResponse>
    {
        //set the logout process
        return {
            error: false,
            user: username,
            errors: [],
            code: StatusCodes.OK,
            message: `L'utilisateur ${username} a été déconnecté avec succès.`,
            data: {}
        };
    }


    /**
     *
     * @param user
     * @private
     */
    private generateToken(user:any):string
    {
        return TokenController.generate({ user_id: user._id, username: user.username, role: user.role });
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
            username: username,
            password: password
        } as UserAuthContract;

        try {

            if (ServerController.database.driverPrefix === 'mongodb') {
                return await AuthentificationController.service.get(targetUser);
            }

            /**
             * If we need to develop directly in node serveur running outside of docker.
             * Still clumsy structure.
             */
            if (ServerController.database.driverPrefix === 'fakeusers') {
                const fakeUser = await FakeUserModel.findOne(targetUser);
                return fakeUser as UserContract;
            }
        } catch (errors: any) {
            return ErrorResponse.create(errors, StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }
}
export default AuthentificationController;