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
import {EmailConfirmationContent} from "@src/Templates/Contents/EmailConfirmationContent";
import {getUserWelcome} from "@src/Users/Helpers/UserEmailHelper";

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
        const targetUser = await this.authenticate(username, password);
        
        // User was find in DB
        if (targetUser &&
            !targetUser.error &&
            targetUser.data !== null)
        {
            const data:any = this.userModel.dataTransfertObject(targetUser.data);

            //Check if user is verified (if verify object exist and it's true, if not, return error forbidden)
            try{
                if(targetUser.data.verify.isVerified !== true)
                return  SuccessResponse.create({ user: data }, StatusCodes.FORBIDDEN, "Votre compte n'est pas vérifié.");    
            }
            catch(e){
                LogHelper.error("Erreur au login, l'utilisateur n'a pas de champs 'verify'", targetUser.data)
                return ErrorResponse.create(new Error(ReasonPhrases.INTERNAL_SERVER_ERROR), StatusCodes.INTERNAL_SERVER_ERROR, "User doesn't have a 'verify' field")
            }

            LogHelper.info(`Les information de ${targetUser.data.username} fonctionnent, génération du token JW ...`);

            // Generate an access token
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
            }
        }

        const createdDocumentResponse = await this.service.insert(userObject);

        if (createdDocumentResponse && typeof createdDocumentResponse !== 'undefined' && !createdDocumentResponse.error)
        {
            //Send email to verify user
            const welcomeName = createdDocumentResponse.data?.firstName ?? 'Cher canard';
            const verifyAccountEmail:EmailNotification = new EmailNotification(
                {
                    recipient: createdDocumentResponse.data.email,
                    subject: welcomeName+", Confirmez ce courriel pour votre compte sur avnu.ca"
                },
                EmailConfirmationContent(welcomeName, "http://localhost:3000/verifier-compte/"+verificationToken)
            );
            verifyAccountEmail.send();

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

    
    /**
     * Verify account if verification token is associated with a user.
     * @param token string of 128 characters of random nature
     * @return {Promise} of type Any.
     * @public
     */
    public async verifyAccount(token:string):Promise<any>{
        //verify that token is the right length
        if(typeof token === 'string' && token.length === AuthentificationController.verifyTokenLength * 2) //times 2 because length in Bytes = 2*hexadecimal
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
                        return ErrorResponse.create(new Error("5 minutes hasn't elapsed since last send"), StatusCodes.OK, "You need to wait 5 minutes before sending a new email");
                    }

                    //Update user with new token and expire date
                    const verificationToken = crypto.randomBytes(AuthentificationController.verifyTokenLength).toString('hex');
                    const verificationExpirationDate = new Date(); //Expiration date setters
                    verificationExpirationDate.setDate(verificationExpirationDate.getDate()+1);
                    const response = await User.getInstance().mongooseModel.findOneAndUpdate(
                        { _id: targetUser._id },
                        {
                            verify:{
                                isVerified:false,
                                token: verificationToken,
                                expireDate: verificationExpirationDate
                            }
                        }
                    )

                    //Resend verify token to user's email
                    const welcomeName = getUserWelcome(targetUser);//encapsulate this into an helper
                    const verifyAccountEmail:EmailNotification = new EmailNotification(
                        {
                            recipient: targetUser.email,
                            subject: welcomeName+", Confirmez ce courriel pour votre compte sur avnu.ca"
                        },
                        EmailConfirmationContent(welcomeName, "http://localhost:3000/verifier-compte/"+verificationToken)
                        );
                        verifyAccountEmail.send();
                    return SuccessResponse.create({email: targetUser.email}, StatusCodes.OK, "Email has been sent")
                        
                }
                return ErrorResponse.create(new Error("User is already verified"), StatusCodes.IM_A_TEAPOT, "User is already verified")
            }
            return ErrorResponse.create(new Error('Invalid email'), StatusCodes.BAD_REQUEST, 'Invalid email');
        }
        return ErrorResponse.create(new Error('Invalid email'), StatusCodes.BAD_REQUEST, 'Invalid email');
    }

}
export default AuthentificationController;