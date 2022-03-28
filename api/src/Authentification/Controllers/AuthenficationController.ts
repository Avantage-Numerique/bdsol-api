import UserModel, {User} from "../Models/UserModel";
import * as jwt from "jsonwebtoken";
import config from "../../config";
import LogHelper from "../../Monitoring/Helpers/LogHelper"
import * as mongoDB from "mongodb";
import ServerController from "../../Server/Controllers/ServerController";


export interface LoginResponse {
    userConnectedToken: string|undefined;
    code: number;
    message: string;
    fields: object|null;
}

export interface LogoutResponse {
    user: string|undefined;
    code: number;
    message: string;
}

export interface UserCredential {
    user: string | null;
    password: string | null;
}


class AuthenficationController
{
    public async login(username:string, password:string): Promise<LoginResponse> {

        // add encryption on send form till checking here.
        LogHelper.log(`${username} trying to connect ...`);

        // TEMP DB BYPASS to make this working quicker.
        const user = await AuthenficationController.getUser(username, password);
        const targetUser = new UserModel(user);

        // User was find in DB
        if (targetUser) {

            LogHelper.log(`Les information de ${targetUser.username} fonctionnent, génération du token JW ...`);

            // Generate an access token
            const userConnectedToken = AuthenficationController.generateToken(targetUser);

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

    private static generateToken(user:UserModel):string {
        return jwt.sign({ username: user.username,  role: user.role }, config.tokenSecret);
    }

    private static async getUser(username:string, password:string): Promise<mongoDB.Document | null> {

        let targetUser: UserCredential = new class implements UserCredential {
            password = password;
            user = username;
        };
        //{ username: username, password: password };
        //let user = ;
        UserModel.collection = ServerController.database.db.collection('users');//this is wrong, my design is clunky. Need refactoring.
        return await UserModel.findOne(targetUser);
    }
}
export default AuthenficationController;