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
import { UsersController } from "../../Users/UsersDomain";


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
        ]
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
        res.serviceResponse = await this.controllerInstance.register(data);
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


    //  GET

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