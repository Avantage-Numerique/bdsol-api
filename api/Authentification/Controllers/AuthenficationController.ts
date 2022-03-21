import users from "../Models/UserModel";
import * as jwt from "jsonwebtoken";
import config from "../../config";
import LogHelper from "../../Monitoring/Helpers/LogHelper"


interface LoginResponse {
    userConnectedToken: string;
    code: number;
    message: string;
}

interface User {
    username:string;
    email:string;
    password:string;
    role: string;
}

class AuthenficationController
{
    public async login(username:string, password:string): Promise<LoginResponse> {

        // add encryption on send form till checking here.
        LogHelper.log(`${username} trying to connect ...`);

        // TEMP DB BYPASS to make this working quicker.
        const user = AuthenficationController.getUser(username, password);

        // User was find in DB
        if (user) {

            LogHelper.log(`Les information de ${username} fonctionnent, génération du token JW ...`);

            // Generate an access token
            const userConnectedToken = AuthenficationController.generateToken(user);

            return {
                userConnectedToken: userConnectedToken,
                code: 200,
                message: 'OK'
            };
        }

        return {
            userConnectedToken: '',
            code: 401,
            message: 'Vos informations de connection sont incorrect, vérifiez votre utilisateur et mot de passe.'//@todo Add this string to a string manager.
        };
    }

    private static generateToken(user:User):string {
        return jwt.sign({ username: user.username,  role: user.role }, config.tokenSecret);
    }

    private static getUser(username:string, password:string):User|undefined {

        return users.find(
            u => { return u.username === username && u.password === password }
        );
    }
}
export default AuthenficationController;