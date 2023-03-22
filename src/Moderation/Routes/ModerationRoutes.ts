import express, {Request, Response} from "express";
import { StatusStates } from "../Schemas/StatusSchema";
import { StatusCodes } from "http-status-codes";

class ModerationRoutes {

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
        this.routerInstance.get('/status-enum', this.getStatusEnumHandler);
        return this.routerInstance;
    }

    public setupAuthRoutes(): express.Router { return this.routerInstance }

    /**
     * End point that return the status Enum handler.
     * Handle the return of the Enum of status available
     * @param req {Request}
     * @param res {Response}
     * @return {Promise<any>}
     */
     public async getStatusEnumHandler(req: Request, res: Response): Promise<any> {
        return res.status(StatusCodes.OK).send(StatusStates);
    }
}
export default ModerationRoutes