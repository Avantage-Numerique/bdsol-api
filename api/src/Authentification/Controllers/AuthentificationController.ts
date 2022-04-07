import {UserContract} from "../../Users/Models/UserModel";
import LogHelper from "../../Monitoring/Helpers/LogHelper"
import ServerController from "../../Server/Controllers/ServerController";
import LoginResponse from "../Responses/LoginResponse";
import {LogoutResponse} from "../Responses/LogoutResponse";
import UserAuthContract from "../Contracts/UserAuthContract";
import {TokenController} from "./TokenController";
import FakeUserModel from "../../Users/Models/FakeUserModel";
import UsersService from "../../Users/Services/UsersService";
import User from "../../Users/Models/User";


class AuthentificationController
{
    public async login(username:string, password:string): Promise<LoginResponse> {

        // add encryption on send form till checking here.
        LogHelper.log(`${username} trying to connect ...`);

        // TEMP DB BYPASS to make this working quicker.
        let targetUser = await AuthentificationController.authenticate(username, password);
        LogHelper.log(targetUser);
        // User was find in DB
        if (targetUser && typeof targetUser.username !== 'undefined') {

            LogHelper.log(`Les information de ${targetUser.username} fonctionnent, génération du token JW ...`);

            // Generate an access token
            const userConnectedToken = AuthentificationController.generateToken(targetUser);

            return {
                error: false,
                userConnectedToken: userConnectedToken,
                code: 200,
                message: 'OK',
                fields: {
                    username: true,
                    password: true
                }
            };
        }

        return {
            error: true,
            userConnectedToken: undefined,
            code: 401,
            message: 'Vos informations de connexion sont incorrectes, vérifiez votre utilisateur et mot de passe.',
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
        };
    }

    public async logout(username:string): Promise<LogoutResponse> {
        //set the logout process
        return {
            error: false,
            user: username,
            code: 200,
            message: `L'utilisateur ${username} a été déconnecté avec succès.`
        };
    }

    /**
     *
     * @param user
     * @private
     */
    private static generateToken(user:any):string {
        return TokenController.generate({ username: user.username,  role: user.role });
    }


    /**
     * search in the current database driver for the user.
     * @param username
     * @param password
     * @private
     */
    private static async authenticate(username:string, password:string): Promise<any> {

        let targetUser = {
            username: username,
            password: password
        } as UserAuthContract;

        if (ServerController.database.driverPrefix === 'mongodb') {
            //construct the credential as UserAuthContract.
            ServerController.database.db('bdsol-users');
            let users = new UsersService(User.getInstance());

            return await users.get(targetUser);
        }

        if (ServerController.database.driverPrefix === 'fakeusers') {

            let fakeUser = await FakeUserModel.findOne(targetUser);
            return fakeUser as UserContract;
        }
        /*
        let targetUserQuery: UserAuthContract = new class implements UserAuthContract {
            limit: 1,
            password = password;
            user = username;
        };
         */
        /*ServerController.setUsersModelCollection();

        if (ServerController.database.driverPrefix === 'fakeusers') {
            return await FakeUserModel.findOne(targetUser) as UserContract;
        }
        if (ServerController.database.driverPrefix === 'mongodb') {
            return await UserModel.findOne(targetUser);
        }*/



        return false;
        //ServerController.database.getModel('users').collection = ServerController.database.getCollection('users');//db.collection('users');//this is wrong, my design is clunky. Need refactoring.

        //LogHelper.log(ServerController.database.driverPrefix, ServerController.usersModel);
        //return await ServerController.usersModel.findOne(targetUser);
    }
}
export default AuthentificationController;