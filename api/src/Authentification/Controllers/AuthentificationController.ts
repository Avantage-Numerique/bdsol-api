import {UserContract} from "../../Users/Models/User";
import LogHelper from "../../Monitoring/Helpers/LogHelper"
import ServerController from "../../Server/Controllers/ServerController";
import LoginResponse from "../Responses/LoginResponse";
import {LogoutResponse} from "../Responses/LogoutResponse";
import UserAuthContract from "../Contracts/UserAuthContract";
import {TokenController} from "./TokenController";
import {UsersService, User, FakeUserModel} from "../../Users/UsersDomain";
import {StatusCodes} from "http-status-codes";


class AuthentificationController
{

    public service:UsersService;
    //user provider.

    constructor() {
        this.service = UsersService.getInstance(User.getInstance());//new UsersService(User.getInstance());

        if (this.service === undefined) {
            LogHelper.error("Service is null in Authentification");
        }
    }

    public async login(username:string, password:string): Promise<LoginResponse> {

        // add encryption on send form till checking here.
        LogHelper.info(`${username} trying to connect ...`);
        LogHelper.info(`Le service`, this.service);

        // TEMP DB BYPASS to make this working quicker.
        let targetUser = await this.authenticate(username, password);

        // User was find in DB
        if (targetUser && typeof targetUser.username !== 'undefined') {

            LogHelper.log(`Les information de ${targetUser.username} fonctionnent, génération du token JW ...`);

            // Generate an access token
            const userConnectedToken = this.generateToken(targetUser);

            return {
                error: false,
                userConnectedToken: userConnectedToken,
                code: StatusCodes.OK,
                errors: [],
                message: 'OK',
                data: {
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

    public async logout(username:string): Promise<LogoutResponse> {
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
    private generateToken(user:any):string {
        return TokenController.generate({ user_id: user._id, username: user.username, role: user.role });
    }

    /**
     * search in the current database driver for the user.
     * @param username
     * @param password
     * @private
     */
    private async authenticate(username:string, password:string): Promise<any> {

        let targetUser = {
            username: username,
            password: password
        } as UserAuthContract;

        //DEBUGING LOGIN : THIS"SERVICE IS an EMPTY Object here.
        if (ServerController.database.driverPrefix === 'mongodb') {
            LogHelper.log(this.service, "authenticate");
            return await this.service.get(targetUser);
        }

        /**
         * If we need to develop directly in node serveur running outside of docker.
         * Still clumsy structure.
         */
        if (ServerController.database.driverPrefix === 'fakeusers') {
            let fakeUser = await FakeUserModel.findOne(targetUser);
            return fakeUser as UserContract;
        }

        return {
            user: undefined
        };
    }
}
export default AuthentificationController;