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
import crypto from "crypto";
import EmailNotification from "@src/Notifications/EmailNotification";
import {getUserWelcome} from "@src/Users/Helpers/UserEmailHelper";
import {EmailConfirmationContent} from "@src/Templates/Contents/EmailConfirmationContent";
import {isObjectIdOrHexString} from "mongoose";
import {EmailForgottenPasswordContent} from "@src/Templates/Contents/EmailForgottenPasswordContent";
import {EmailPasswordChangedContent} from "@src/Templates/Contents/EmailPasswordChangedContent";

class AuthentificationController
{

    /** @private @static Singleton instance */
    private static _instance:AuthentificationController;


    public service:UsersService;
    public userModel:User;
    private static verifyTokenLength = 128;


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
        const targetUser = await this.authenticate(username, password);//return user as dto already.
        
        // User was find in DB
        if (targetUser &&
            !targetUser.error &&
            targetUser.data !== null)
        {
            const user:any = targetUser.data;

            //Check if user is verified (if verify object exist and it's true, if not, return error forbidden)
            try{
                if(user.verify.isVerified !== true)
                return  SuccessResponse.create({ user: user }, StatusCodes.FORBIDDEN, "Votre compte n'est pas vérifié.");
            }
            catch(e){
                LogHelper.error("Erreur au login, l'utilisateur n'a pas de champs 'verify'", user)
                return ErrorResponse.create(new Error(ReasonPhrases.INTERNAL_SERVER_ERROR), StatusCodes.INTERNAL_SERVER_ERROR, "User doesn't have a 'verify' field")
            }

            LogHelper.info(`Les information de ${user.username} fonctionnent, génération du token JW ...`);

            // Generate an access token
            user.token = TokenController.generateUserToken(user);
            user.tokenVerified = true;

            //Modify lastLogin date
            const lastLogin = await User.getInstance().mongooseModel.findOneAndUpdate({_id: targetUser.data._id}, { lastLogin: new Date() })
            LogHelper.debug(lastLogin)
            return  SuccessResponse.create(
                { user: user },
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
        if (ServerController.database.driverPrefix === 'mongodb' || ServerController.database.driverPrefix === 'mongodb+srv')
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


    /**
     * @comment Password is beeing hashed inside findOneAndUpdate 'pre' event in the model
     * @param requestData 
     * @returns 
     */
    public async register(requestData:any): Promise<ApiResponseContract>
    {
        if(requestData?.tos?.accepted !== true)
            return ErrorResponse.create(
                new Error(ReasonPhrases.OK),
                StatusCodes.OK,
                'User need to accept terms of service.'
            );
        const verificationToken = crypto.randomBytes(AuthentificationController.verifyTokenLength).toString('hex');
        const verificationExpirationDate = new Date(); //Expiration date setters
        verificationExpirationDate.setDate(verificationExpirationDate.getDate()+1);
        const userObject = {
            username: requestData?.username,
            email: requestData?.email,
            password: requestData?.password,
            name: requestData?.name,
            firstName: requestData?.firstName,
            lastName: requestData?.lastName,
            verify:{
                isVerified:false,
                token: verificationToken,
                expireDate: verificationExpirationDate,
            },
            tos: {
                accepted: true,
                acceptedOn: new Date
            }
        }

        const createdDocumentResponse = await this.service.insert(userObject);
        if (createdDocumentResponse && typeof createdDocumentResponse !== 'undefined' && !createdDocumentResponse.error)
        {
            createdDocumentResponse.data = this.userModel.dataTransfertObject(createdDocumentResponse.data);
            //Send email to verify user
            const welcomeName = getUserWelcome(createdDocumentResponse.data);
            const verifyAccountEmail:EmailNotification = new EmailNotification(
                {
                    recipient: createdDocumentResponse.data.email,
                    subject: welcomeName+", Confirmez ce courriel pour votre compte sur avnu.ca"
                },
                EmailConfirmationContent(welcomeName, config.frontendAppUrl+"/compte/verifier-compte/"+verificationToken)
            );
            await verifyAccountEmail.send();

            //Return create user response
            return createdDocumentResponse;
        }

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
            LogHelper.info(`Vérification des informations fournis par ${username} on database driver ${ServerController.database.driverPrefix}`);
            if (ServerController.database.driverPrefix === 'mongodb' || ServerController.database.driverPrefix === 'mongodb+srv')
            {
                //Note: Service removed password with the DTO, soo we used mongooseModel directly
                //Refactoring : We should manage internal and external responses seperately in different services ...
                const user:any = await User.getInstance().mongooseModel.findOne(targetUser).lean();
    
                // If we find a user, we check the password through the hashing comparaison.
                if (user !== null && user.password !== undefined)
                {
                    if (await PasswordsController.matches(user.password, password)) {
                        return SuccessResponse.create(this.userModel.dataTransfertObject(user), StatusCodes.OK, ReasonPhrases.OK);
                    }
                }
            }
        }
        catch (errors: any)
        {
            return ErrorResponse.create(errors, StatusCodes.INTERNAL_SERVER_ERROR);
        }

        return ErrorResponse.create(new Error("Connection refusée"), StatusCodes.UNAUTHORIZED);
    }

    /**
     * Allow to change user's password for newPassword if userId and oldPassword corresponds to user.password hash.
     * @param {ObjectId} userId objectId of user in database that ask request for change
     * @param {string} oldPassword user's input
     * @param {string} newPassword user's input
     * @return {Promise} of type Any.
     * @public
     */
    public async changePassword(userId:string, oldPassword:string, newPassword:string):Promise<any>{
        //Check if variables are defined and string/ObjectId
        if(!isObjectIdOrHexString(userId))
            return ErrorResponse.create(new Error("Invalid user id"), StatusCodes.BAD_REQUEST, "Invalid user id");

        //Check if newPassword is 'ok' in length and condition
        if(typeof newPassword !== 'string' || newPassword.length < 8)
            //If not return newPassword is not ok
            return ErrorResponse.create(new Error("Invalid new password"), StatusCodes.BAD_REQUEST, "Invalid new password");

        //Check if user exist
        const targetUser = await User.getInstance().mongooseModel.findOne({ _id : userId });
        
        //If user exist compare oldPassword and user.password with argon
        if(targetUser !== null){
            const match = await PasswordsController.matches(targetUser.password, oldPassword);
            if(match){
                //If user password and old match, procceed to change password
                const updatedUser = await User.getInstance().mongooseModel.findOneAndUpdate({ _id: targetUser._id}, {password : newPassword});
                //Send email to user's email to inform the password change
                if(updatedUser !== null){
                    const welcomeName = getUserWelcome(targetUser);//encapsulate this into an helper
                    const changedPasswordEmail:EmailNotification = new EmailNotification(
                    {
                        recipient: targetUser.email,
                        subject: welcomeName+", Votre mot de passe a été modifié sur avnu.ca"
                    },
                    EmailPasswordChangedContent(welcomeName, config.frontendAppUrl+"/compte/connexion")
                    );
                    changedPasswordEmail.send();
                    return SuccessResponse.create(User.getInstance().dataTransfertObject(updatedUser), StatusCodes.OK, "Password modified")
                }
            }
            return ErrorResponse.create(new Error("Invalid password or user"), StatusCodes.BAD_REQUEST, "Invalid password or user");
        }
        else {
            //Else wrong password don't change it
            return ErrorResponse.create(new Error("Invalid password or user"), StatusCodes.BAD_REQUEST, "Invalid password or user");
        }
        
    }

    /**
     * Allow user to reset his password by email.
     * @param {string} email email of user to send email to reset password
     * @return {Promise} of type Any.
     * @public
     */
    public async sendResetPasswordLinkByEmail(email:string):Promise<any> {
        //Check if email is defined and string and length > 0
        if(typeof email === 'string' && email.length > 0){
            //Check if email corresponds to a user in the database
            const targetUser = await User.getInstance().mongooseModel.findOne({ email : email });
            if(targetUser !== null){
                //Check if user is verified? (if not then can't change password, need to verify first)
                if(targetUser.verify?.isVerified !== true)
                    return this.resendVerificationToken(email);

                //Email OK and user is verified
                //Check if 5 min elapsed since last token sent
                const now = new Date();
                const expireDate30MinutesLess = targetUser?.verify.expireDate ?? new Date();
                expireDate30MinutesLess.setMinutes(expireDate30MinutesLess.setMinutes()-30);
                if(targetUser?.changePassword?.expireDate !== undefined &&
                    now.valueOf() - expireDate30MinutesLess < (5*60*1000))
                    //Need to wait 5 min for new token
                    return SuccessResponse.create({}, StatusCodes.OK, "Sent reset password email")

                //Update user with new changePassword token and expire date
                const passwordToken = crypto.randomBytes(AuthentificationController.verifyTokenLength).toString('hex');
                const passwordTokenExpirationDate = new Date(); //Expiration date setters
                passwordTokenExpirationDate.setMinutes(passwordTokenExpirationDate.getMinutes()+30);
                const updatedUser = await User.getInstance().mongooseModel.findOneAndUpdate(
                    { _id: targetUser._id },
                    {
                        changePassword:{
                            token: passwordToken,
                            expireDate: passwordTokenExpirationDate
                        }
                    }
                )
                //Send email with a unique secure link to procceed to reset user's password
                const welcomeName = getUserWelcome(updatedUser);
                const forgotPasswordEmail:EmailNotification = new EmailNotification(
                    {
                        recipient: targetUser.email,
                        subject: welcomeName+", Demande de réinitialisation de mot de passe sur avnu.ca"
                    },
                    EmailForgottenPasswordContent(welcomeName, config.frontendAppUrl+"/compte/nouveau-mot-de-passe/"+passwordToken)
                    );
                forgotPasswordEmail.send();
                return SuccessResponse.create({}, StatusCodes.OK, "Sent reset password email")
            }
            //Invalid email (for security we always return same response)
            return SuccessResponse.create({}, StatusCodes.OK, "Sent reset password email")
        }
        //Invalid requestData
        return SuccessResponse.create({}, StatusCodes.OK, "Sent reset password email")
    }

    /**
     * Allow user to reset his password by email.
     * @param {string} email email of user to send email to reset password
     * @param {string} password email of user to send email to reset password
     * @return {Promise} of type Any.
     * @public
     */
    public async updateForgottenPassword(token:string, password:string):Promise<any> {
        //Verify that token is the right length
        if(typeof token === 'string' && token.length === AuthentificationController.verifyTokenLength * 2) //times 2 because length (n Bytes = 2n hexadecimal)
        {
            //Check if token exists
            const targetUser = await User.getInstance().mongooseModel.findOne({"changePassword.token": token});

            //If user exist
            if(targetUser !== null){
                //Check if token is not expired
                if(new Date(targetUser.changePassword.expireDate).valueOf() < new Date().valueOf())
                    return ErrorResponse.create(new Error("The verification token has expired"), StatusCodes.OK, "The verification token has expired");

                //Check if password is ok in length and conditions
                if(typeof password == 'string' && password.length >= 8){
                    //If user password and old match, procceed to change password
                    const updatedUser = await User.getInstance().mongooseModel.findOneAndUpdate(
                        { _id: targetUser._id},
                        {
                            password : password,
                            changePassword: { token: null, expireDate: null}
                    });
                    //Send email to user's email to inform the password change
                    if(updatedUser !== null){
                        const welcomeName = getUserWelcome(targetUser);//encapsulate this into an helper
                        const changedPasswordEmail:EmailNotification = new EmailNotification(
                        {
                            recipient: targetUser.email,
                            subject: welcomeName+", Votre mot de passe a été modifié sur avnu.ca"
                        },
                        EmailPasswordChangedContent(welcomeName, config.frontendAppUrl+"/compte/connexion")
                        );
                        changedPasswordEmail.send();
                        return SuccessResponse.create({email: targetUser.email}, StatusCodes.OK, "Password modified")
                    }

                    return ErrorResponse.create(new Error("Couldn't update user"), StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't update user");
                }
                return ErrorResponse.create(new Error('Invalid new password'), StatusCodes.BAD_REQUEST, 'Invalid new password')
            }
            //Token doesn't exist
            return ErrorResponse.create(new Error("Token invalid"), StatusCodes.BAD_REQUEST, "Token invalid");
        }
        //Token is invalid format
        return ErrorResponse.create(new Error("Token invalid"), StatusCodes.BAD_REQUEST, "Token invalid");
    }

    /**
     * Verify account if verification token is associated with a user.
     * @param token string of 128 characters of random nature
     * @return {Promise} of type Any.
     * @public
     */
    public async verifyAccount(token:string):Promise<any>{
        //verify that token is the right length
        if(typeof token === 'string' && token.length === AuthentificationController.verifyTokenLength * 2) //times 2 because length (n Bytes = 2n hexadecimal)
        {
            //search users and find the one that has the token
            const targetUser = await User.getInstance().mongooseModel.findOne({ "verify.token" : token })

            //If user is found
            if(targetUser !== null){
                //if he's already verified
                if(targetUser.verify.isVerified === true){
                    return ErrorResponse.create(new Error("User's account already verified"), StatusCodes.CONFLICT, "User's account already verified" );
                }
                //if token has expired
                if(new Date(targetUser.verify.expireDate).valueOf() < new Date().valueOf())
                    return ErrorResponse.create(new Error("The verification token has expired"), StatusCodes.OK, "The verification token has expired");
                
                //else modify user to verify.isVerified = true and set the rest of object
                const response = await User.getInstance().mongooseModel.findOneAndUpdate(
                    {_id : targetUser._id},
                    {verify: { isVerified: true, token: null, expireDate: null, validatedOn: new Date()}},
                    {new: true})
                const dtoResponse = User.getInstance().dataTransfertObject(response);

                //Return connection token for that user?
                return SuccessResponse.create(dtoResponse, StatusCodes.OK, "User's account is now verified");
            }
            //else couldn't find user, means token doesn't exist
            LogHelper.error("Verify account token doesn't exist");
            return ErrorResponse.create(new Error("Token invalid"), StatusCodes.BAD_REQUEST, "Token invalid");
        }
        LogHelper.error("Verify account token is not the right length");
        return ErrorResponse.create(new Error("Token invalid"), StatusCodes.BAD_REQUEST, "Token invalid");
    }

    /**
     * search in the current database driver for the user.
     * @param email string of user's email account
     * @return {Promise} of type Any.
     * @public
     */
    public async resendVerificationToken(email:string):Promise<any>{
        //Check if email is defined
        if(typeof email === 'string' && email?.length > 0){
            //Check if email is associated with a user
            const targetUser = await User.getInstance().mongooseModel.findOne({email: email});
            //If user exist
            if(targetUser !== null){
                //If user is not verified
                if(targetUser?.verify?.isVerified !== true){
                    //Check if user hasn't resend in the last 5 minutes
                    const now = new Date();
                    //Sets expired date 1 day before the token soo that I can check if 5 min passed and compare to now
                    const expireDateOneDayLess = targetUser?.verify.expireDate ?? new Date();
                    expireDateOneDayLess.setDate(expireDateOneDayLess.getDate()-1);

                    if(now.valueOf() - expireDateOneDayLess < (5*60*1000)){
                        //5 minutes delay inbetween emails
                        return SuccessResponse.create({}, StatusCodes.OK, "Sent verification email")
                    }

                    //Update user with new token and expire date
                    const verificationToken = crypto.randomBytes(AuthentificationController.verifyTokenLength).toString('hex');
                    const verificationExpirationDate = new Date(); //Expiration date setters
                    verificationExpirationDate.setDate(verificationExpirationDate.getDate()+1);
                    const updatedUser = await User.getInstance().mongooseModel.findOneAndUpdate(
                        { _id: targetUser._id },
                        {
                            verify:{
                                isVerified:false,
                                token: verificationToken,
                                expireDate: verificationExpirationDate
                            }
                        }
                    );

                    //Resend verify token to user's email
                    const welcomeName = getUserWelcome(targetUser);//encapsulate this into an helper
                    const verifyAccountEmail:EmailNotification = new EmailNotification(
                        {
                            recipient: targetUser.email,
                            subject: welcomeName+", Confirmez ce courriel pour votre compte sur avnu.ca"
                        },
                        EmailConfirmationContent(welcomeName, config.frontendAppUrl+"/compte/verifier-compte/"+verificationToken)
                        );
                        verifyAccountEmail.send();
                    return SuccessResponse.create({}, StatusCodes.OK, "Sent verification email")
                        
                }
                //user already verified (for security we always send same message)
                return SuccessResponse.create({}, StatusCodes.OK, "Sent verification email")
            }
            //invalid email
            return SuccessResponse.create({}, StatusCodes.OK, "Sent verification email")
        }
        //invalid email
        return SuccessResponse.create({}, StatusCodes.OK, "Sent verification email")
    }

}
export default AuthentificationController;