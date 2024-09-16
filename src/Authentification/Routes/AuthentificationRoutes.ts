import express, {Request, Response} from "express";
import LogHelper from "../../Monitoring/Helpers/LogHelper";
import config from "../../config";
import {ReasonPhrases, StatusCodes} from "http-status-codes";
import AuthentificationController from "../Controllers/AuthentificationController";
import {VerifyTokenMiddleware} from "../Middleware/VerifyTokenMiddleware";
import {body} from "express-validator";
import {NoHtmlSanitizer} from "../../Security/Sanitizers/NoHtmlSanitizer";
import {NoSpaceSanitizer} from "../../Security/Sanitizers/NoSpaceSanitizer";
import {NoAccentSanitizer} from "../../Security/Sanitizers/NoAccentSanitizer";
import {UsersController} from "../../Users/UsersDomain";


export class AuthentificationRoutes {
    
    /**
     * Controller of a specific entity.
     */
    public controllerInstance: AuthentificationController = AuthentificationController.getInstance();

    /**
     * Router for public route.
     */
    public routerInstance: express.Router = express.Router();

    /**
     * Router for the authentifiation route.
     */
    public routerInstanceAuthentification: express.Router = express.Router();

    /**
     * All he current routes middlewares to add into the routes.
     */
    public middlewaresDistribution:any = {
        register: [
            body('data.username')
                .customSanitizer(NoHtmlSanitizer.validatorCustomSanitizer())
                .stripLow()
                .customSanitizer(NoSpaceSanitizer.validatorCustomSanitizer())
                .customSanitizer(NoAccentSanitizer.validatorCustomSanitizer())
                .trim(),
            body('data.email')
                .customSanitizer(NoHtmlSanitizer.validatorCustomSanitizer())
                .stripLow()
                .normalizeEmail()
                .trim(),
            //body('data.password'),
            body('data.avatar')
                .isURL()
                .customSanitizer(NoHtmlSanitizer.validatorCustomSanitizer())
                .trim(),
            body('data.name')
                .customSanitizer(NoHtmlSanitizer.validatorCustomSanitizer())
                .trim(),
            body('data.role')
                .customSanitizer(NoHtmlSanitizer.validatorCustomSanitizer())
                .stripLow()
                .trim()
        ],
        email: [
            body('data.email').exists({checkFalsy:true}).bail()
            .customSanitizer(NoHtmlSanitizer.validatorCustomSanitizer())
            .stripLow()
            .normalizeEmail()
            .trim(),
        ],
    };


    /**
     * AuthRoutes init
     * Setup all the private or authentification route, of the entity. Each of these need to add a header with a token to execute the controller's method.
     * @return {express.Router} router for the private route.
     * @public @method
     */
    public setupAuthRoutes():express.Router
    {
        this.routerInstanceAuthentification.post('/logout', [
            VerifyTokenMiddleware.middlewareFunction(),
            this.logoutHandler.bind(this)
        ]);

        this.routerInstanceAuthentification.post('/change-password', [
            VerifyTokenMiddleware.middlewareFunction(),
            this.changePasswordHandler.bind(this)
        ]);

        return this.routerInstanceAuthentification;
    }


    /**
     * Public routes init
     * Setup all the endpoint that can be reachable when no token is added to the header (public)
     * @return {express.Router} router for the public routes
     * @public @method
     */
    public setupPublicRoutes():express.Router
    {
        this.routerInstance.post('/register', [
            //...this.addMiddlewares("register"),
            this.registerHandler.bind(this)
        ]);

        this.routerInstance.post('/login', [
            this.loginHandler.bind(this)
        ]);

        this.routerInstance.post('/verify-token', [
            this.verifyTokenHandler.bind(this)
        ]);

        this.routerInstance.post('/generate-token', [
            this.generateTokenDevHandler.bind(this)
        ]);

        this.routerInstance.post('/reset-password', [
            ...this.addMiddlewares("email"),
            this.sendResetPasswordLinkByEmailHandler.bind(this)
        ]);

        //Route to check if /reset-password/:token is valid url
        this.routerInstance.get('/reset-password/:token', [
            this.verifyResetPasswordTokenUrl.bind(this)
        ])
        this.routerInstance.post('/reset-password/:token', [
            this.updateForgottenPasswordHandler.bind(this)
        ]);

        this.routerInstance.post('/verify-account/resend', [
            ...this.addMiddlewares("email"),
            this.resendEmailVerificationTokenHandler.bind(this)
        ]);


        //Verify user account (post or get?)
        this.routerInstance.get('/verify-account/:token', [
            this.verifyUserAccountHandler.bind(this)
        ]);

        this.routerInstance.get('/login', [
            this.loginGetHandler.bind(this)
        ]);

        return this.routerInstance;
    }


    /**
     * Add middleware from target array into the middlewares space in route declaration.
     * @param route {string} the route / property of the middlewares array to push into middleware for this.
     * @param middlewares {string} Not used yet.
     */
    public addMiddlewares(route:string, middlewares:string = ""):Array<any>
    {
        return this.middlewaresDistribution[route] ?? [];
    }


    //  POST

    /**
     * POST:REGISTER
     * The "CREATE USER" ROUTE.
     * @param req {Request}
     * @param res {Response}
     * @return {Promise<any>}
     */
    public async registerHandler(req: Request, res: Response): Promise<any> {

        const {data} = req.body;
        const visitorIp = req.visitor.ip;
        res.serviceResponse = await this.controllerInstance.register(data, visitorIp);
        res.serviceResponse.action = "create";
        //History of registration
        if(!res.serviceResponse.error)
            await UsersController.getInstance().createUserHistory(req, res);

        return res.status(res.serviceResponse.code).send(res.serviceResponse);
    }


    /**
     * POST:LOGIN
     * Check if the user is logged in.
     * @param req {Request}
     * @param res {Response}
     * @return {Promise<any>}
     */
    public async loginHandler(req: Request, res: Response): Promise<any> {

        const {username, password} = req.body;
        const response = await this.controllerInstance.login(username, password);

        return res.status(response.code).send(response);
    }


    /**
     * POST:LOGOUT
     * Check if the user is logged in.
     * @param req {Request}
     * @param res {Response}
     * @return {Promise<any>}
     */
    public async logoutHandler(req: Request, res: Response): Promise<any>
    {
        const response = await this.controllerInstance.logout(req.body.username);
        return res.status(response.code).send(response);
    }

    /**
     * Post method to verify if a token is valid and if it isn't expired.
     * requête body en JSON :
     * @param req {Request}
     * @param res {Response}
     * @return {Promise<any>}
     */
    public async verifyTokenHandler(req: Request, res: Response): Promise<any>
    {
        const response = await this.controllerInstance.verifyToken(req.body.token);
        return res.status(response.code).send(response);
    }


    /**
     * Post methodqui retourne un token pour un utilisateur.
     * requête body en JSON :
     * @param req {Request}
     * @param res {Response}
     * @return {Promise<any>}
     */
    public async generateTokenDevHandler(req: Request, res: Response): Promise<any>
    {
        if (config.isDevelopment)
        {
            const token = await this.controllerInstance.generateToken();

            return res.status(StatusCodes.OK).send({
                "message": ReasonPhrases.OK,
                "token": token
            });
        }

        return res.status(StatusCodes.UNAUTHORIZED).json({
            "message": ReasonPhrases.UNAUTHORIZED
        });
    }

    /**
     * Post method qui prend l'ancien mdp et le nouveau souhaité, compare les hash de l'ancien avec la bd et modifie pour le nouveau sur un succès de comparaison.
     * @param req {Request}
     * @param res {Response}
     * @return {Promise<any>}
     */
    public async changePasswordHandler(req: Request, res: Response): Promise<any>
    {
        //UserId must be replaced by some id in the request (to not be able to forge request of password change)
        const {oldPassword, newPassword} = req.body.data;
        const userId = req.user?._id;

        const response = await this.controllerInstance.changePassword(userId, oldPassword, newPassword);
        return res.status(response.code).send(response);
    }

    /**
     * Post method qui envoi un courriel de reset de mot de passe.
     * @param req {Request}
     * @param res {Response}
     * @return {Promise<any>}
     */
    public async sendResetPasswordLinkByEmailHandler(req: Request, res: Response): Promise<any>
    {
        const email = req.body.data?.email;
        const visitorIp = req.visitor.ip;
        const response = await this.controllerInstance.sendResetPasswordLinkByEmail(email, visitorIp)
        return res.status(response.code).send(response);
    }

    /**
     * Post qui assigne un nouveau mot de passe au user
     * @param req {Request}
     * @param res {Response}
     * @return {Promise<any>}
     */
    public async updateForgottenPasswordHandler(req: Request, res: Response): Promise<any>
    {
        const password = req.body.data?.password;
        const response = await this.controllerInstance.updateForgottenPassword(req.params?.token.toString() ?? '', password);
        return res.status(response.code).send(response);
    }
    
    
    /**
    * Post method qui renvoie un courriel de token de vérification de compte.
     * requête body en JSON :
     * @param req {Request}
     * @param res {Response}
     * @return {Promise<any>}
     */
    public async resendEmailVerificationTokenHandler(req: Request, res: Response): Promise<any>
    {
        const email = req.body.data?.email;
        const response = await this.controllerInstance.resendVerificationToken(email);
        return res.status(response.code).send(response);
    }
    
    //  GET
    /**
     * Get method qui vérifie le compte d'un utilisateur.
     * @param req {Request}
     * @param res {Response}
     * @return {Promise<any>}
     */
    public async verifyResetPasswordTokenUrl(req: Request, res: Response): Promise<any>
    {
        const token = req.params?.token.toString();
        const response = await this.controllerInstance.verifyResetPasswordToken(token);
        return res.status(response.code).send(response);
    }

    /**
     * Get method qui vérifie le compte d'un utilisateur.
     * @param req {Request}
     * @param res {Response}
     * @return {Promise<any>}
     */
    public async verifyUserAccountHandler(req: Request, res: Response): Promise<any>
    {
        const token = req.params.token?.toString() ?? '';
        const visitorIp = req.visitor.ip;
        const response = await this.controllerInstance.verifyAccount(token, visitorIp);
        return res.status(response.code).send(response);
    }
    
    /**
     * GET:LOGIN
     * Return content to the user accessing /login on a get route.
     * @param req {Request}
     * @param res {Response}
     * @return {Promise<any>}
     */
    public async loginGetHandler(req: Request, res: Response): Promise<any> {
        LogHelper.warn('trying to access login with get method');
        return res.send('There is no place in this  for login.');
    }

}