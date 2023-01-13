
/*
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

app.post('/profile', upload.single('avatar'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any

})
*/

import express, {NextFunction, Request, Response} from "express";
import MediasController from "../Controllers/MediasController";
import AbstractRoute from "../../Abstract/Route";
import LogHelper from "../../Monitoring/Helpers/LogHelper";
import uploadSingle from "../Middlewares/UploadSingleMediaMiddleware";


class MediasRoutes extends AbstractRoute {

    controllerInstance:any = MediasController.getInstance();
    routerInstance: express.Router = express.Router();
    routerInstanceAuthentification: express.Router = express.Router();

    middlewaresDistribution:any = {
        all: [],
        createUpdate: [],
        create: [],
        update: [],
        delete: [],
        search: [],
        list: [],
        getinfo: [],
        getdoc: [],
    }

    /**
     * The default middlewares for targeted route.
     * @abstract
     */
    defaultMiddlewaresDistribution: any = {
        all: [],
        create: [],
        createUpdate: [],
        update: [],
        delete: [],
        search: [],
        list: [],
        getinfo: [],
        getdoc: [],
        bySlug: []
    };

    /**
     * Public routes init
     * Setup all the endpoint that can be reachable when no token is added to the header (public)
     * @return {express.Router} router for the public routes
     * @public @method
     */
    public setupPublicRoutes(): express.Router {

        this.routerInstance.get('/', [
            ...this.addMiddlewares("all"),
            this.basepathHandler.bind(this),
            this.routeSendResponse.bind(this),
        ]);

        return this.routerInstance;
    }

    /**
     * AutnRoutes init
     * Setup all the private or authentification route, of the entity. Each of these need to add a header with a token to execute the controller's method.
     * @return {express.Router} router for the private route.
     * @public @method
     */
    public setupAuthRoutes(): express.Router {

        this.routerInstance.post('/', [
            ...this.addMiddlewares("all"),
            uploadSingle.single("mainImage"),
            this.uploadSingleHandler.bind(this),
            this.routeSendResponse.bind(this),
        ]);
        return this.setupAdditionnalAuthRoutes(this.routerInstanceAuthentification);
    }

    public setupAdditionnalAuthRoutes(router: express.Router):express.Router {
        return router;
    }

    public setupAdditionnalPublicRoutes(router: express.Router):express.Router {
        return router;
    }

    /**
     * BasePath
     * Handle the list method of the controller of the entity, passing the data to it.
     * @param req {Request}
     * @param res {Response}
     * @param next {NextFunction}
     * @return {Promise<any>}
     */
    public async uploadSingleHandler(req: Request, res: Response, next: NextFunction): Promise<any> {
        LogHelper.debug("uploadSingleHandler");
        // req.file is the name of your file in the form above, here 'uploaded_file'
        // req.body will hold the text fields, if there were any
        console.log(req.file, req.body);
        res.serviceResponse = await this.controllerInstance.uploadSingle(req.body.data);
        return next();
    }

    /**
     * BasePath
     * Handle the list method of the controller of the entity, passing the data to it.
     * @param req {Request}
     * @param res {Response}
     * @param next {NextFunction}
     * @return {Promise<any>}
     */
    public async basepathHandler(req: Request, res: Response, next: NextFunction): Promise<any> {
        LogHelper.debug("basePathHandler");
        res.serviceResponse = await this.controllerInstance.basepath(req.body.data);
        return next();
    }
}
export {MediasRoutes};