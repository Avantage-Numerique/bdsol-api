import express, {Request, Response} from "express";
import { StatusCodes } from "http-status-codes";

class SearchRoutes {

    public routerInstance: express.Router;
    public routerInstanceAuthentification: express.Router;

    constructor(){
        this.routerInstance = express.Router();
        this.routerInstanceAuthentification = express.Router();
    }

    /**
     * Public routes init
     * Setup all the endpoint that can be reachable when no token is added to the header (public)
     * @return {express.Router} router for the public routes
     * @public @method
     */
    public setupPublicRoutes(): express.Router {
        this.routerInstance.get('/', this.getSearchOnParam);
        return this.routerInstance;
    }

    public setupAuthRoutes(): express.Router { return this.routerInstance }

    /**
     * GetStatusEnumHandler
     * Handle the return of the Enum of status available
     * @param req {Request}
     * @param res {Response}
     * @param next {NextFunction}
     * @return {Promise<any>}
     */
     public async getSearchOnParam(req: Request, res: Response): Promise<any> {
        //Need to send an array of objects that have been requested from params : req.query
        return res.status(StatusCodes.OK).send([req.query]);
    }
}
export default SearchRoutes