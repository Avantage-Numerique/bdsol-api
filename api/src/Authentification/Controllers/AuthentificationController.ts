import UserModel, {UserContract} from "../../Users/Models/UserModel";
import * as jwt from "jsonwebtoken";
import config from "../../config";
import LogHelper from "../../Monitoring/Helpers/LogHelper"
import * as mongoDB from "mongodb";
import ServerController from "../../Server/Controllers/ServerController";
import LoginResponse from "../Responses/LoginResponse";
import {LogoutResponse} from "../Responses/LogoutResponse";
import UserAuthContract from "../Contracts/UserAuthContract";
import FakeUserModel from "../../Users/Models/FakeUserModel";


class AuthentificationController
{
    public async login(username:string, password:string): Promise<LoginResponse> {

        // add encryption on send form till checking here.
        LogHelper.log(`${username} trying to connect ...`);

        // TEMP DB BYPASS to make this working quicker.
        const user = await AuthentificationController.getUser(username, password);
        const targetUser = new UserModel(user);

        // User was find in DB
        if (targetUser) {

            LogHelper.log(`Les information de ${targetUser.username} fonctionnent, génération du token JW ...`);

            // Generate an access token
            const userConnectedToken = AuthentificationController.generateToken(targetUser);

            return {
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
    private static generateToken(user:UserModel):string {
        return jwt.sign({ username: user.username,  role: user.role }, config.tokenSecret);
    }


    /**
     * search in the current database driver for the user.
     * @param username
     * @param password
     * @private
     */
    private static async getUser(username:string, password:string): Promise<mongoDB.Document | UserContract | null> {

        //construct the credential as UserAuthContract.
        let targetUser: UserAuthContract = new class implements UserAuthContract {
            password = password;
            user = username;
        };

        /*ServerController.setUsersModelCollection();

        if (ServerController.database.driverPrefix === 'fakeusers') {
            return await FakeUserModel.findOne(targetUser) as UserContract;
        }
        if (ServerController.database.driverPrefix === 'mongodb') {
            return await UserModel.findOne(targetUser);
        }*/



        return null;
        //ServerController.database.getModel('users').collection = ServerController.database.getCollection('users');//db.collection('users');//this is wrong, my design is clunky. Need refactoring.

        //LogHelper.log(ServerController.database.driverPrefix, ServerController.usersModel);
        //return await ServerController.usersModel.findOne(targetUser);
    }
}
export default AuthentificationController;