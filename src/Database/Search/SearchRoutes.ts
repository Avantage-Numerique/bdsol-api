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
        this.routerInstance.get('/', this.getSearchSuggestion);
        this.routerInstance.get('/results', this.getSearchOnParam);
        return this.routerInstance;
    }

    public setupAuthRoutes(): express.Router { return this.routerInstance }

    /**
     * GetSearchOnParam
     * Handle the search and returns the full list of entity
     * @param req {Request}
     * @param res {Response}
     * @return {Promise<any>}
     */
     public async getSearchOnParam(req: Request, res: Response): Promise<any> {
         //Send out $text : { $search : req.query } to all entity
         //Merge in an array the results of each search
         //Sort from search score (or let frontend do it)

         //Send back full (DTO) of each entity search result in an array sorted, 
        return res.status(StatusCodes.OK).send([req.query]);
    }

    /**
     * getSearchSuggestion
     * Handle the search and returns only and overview about what would the full search return
     * @param req {Request}
     * @param res {Response}
     * @return {Promise<any>}
     */
     public async getSearchSuggestion(req: Request, res: Response): Promise<any> {
         //Send out $text : { $search : req.query } to all entity
         //Only take the _id, and fewest fields possible (_id, name, slug, type)
         //Merge in an array the results of each search
         //Sort from search score (or let frontend do it)

         //Send back DTO of fewest field of each entity search result in an array sorted, 
        return res.status(StatusCodes.OK).send([req.query]);
    }
}
export default SearchRoutes