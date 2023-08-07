import express, {Request, Response} from "express";
import { StatusStates } from "../Schemas/StatusSchema";
import { StatusCodes } from "http-status-codes";
import { ProjectContextEnum } from "../../Projects/ProjectContextEnum";
import { BudgetRangeEnum, TimeframeEtaEnum } from "../../Database/Schemas/ScheduleBudgetSchema";
import EnumHelper from "../../Helpers/EnumHelper";
import { EventTypeEnum } from "@src/Events/EventTypeEnum";

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
        this.routerInstance.get('/context-enum', this.getContextEnumHandler);
        this.routerInstance.get('/budgetrange-enum', this.getBudgetRangeEnumHandler);
        this.routerInstance.get('/timeframeeta-enum', this.getTimeframeEtaEnumHandler);
        this.routerInstance.get('/eventtype-enum', this.getEventTypeEnumHandler);
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
    public async getContextEnumHandler(req: Request, res: Response): Promise<any> {
       return res.status(StatusCodes.OK).send(EnumHelper.enumToSelectOptions(ProjectContextEnum));
    }
    public async getBudgetRangeEnumHandler(req: Request, res: Response): Promise<any> {
       return res.status(StatusCodes.OK).send(EnumHelper.enumToSelectOptions(BudgetRangeEnum));
    }
    public async getTimeframeEtaEnumHandler(req: Request, res: Response): Promise<any> {
       return res.status(StatusCodes.OK).send(EnumHelper.enumToSelectOptions(TimeframeEtaEnum));
    }
    public async getEventTypeEnumHandler(req: Request, res: Response): Promise<any> {
       return res.status(StatusCodes.OK).send(EnumHelper.enumToSelectOptions(EventTypeEnum));
    }
}
export default ModerationRoutes