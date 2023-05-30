import express, {NextFunction, Request, Response} from "express";
import {StatusCodes} from "http-status-codes";
import { ErrorResponse } from "../../Http/Responses/ErrorResponse";
import { SuccessResponse } from "../../Http/Responses/SuccessResponse";
import { ReasonPhrases } from "http-status-codes";
import AbstractRoute from "../../Abstract/Route";
import SearchSuggestions from "./SearchSuggestions";
import SearchResults from "./SearchResults";

class SearchRoutes extends AbstractRoute {

    public routerInstance: express.Router;
    public routerInstanceAuthentification: express.Router;
    public controllerInstance: any;
    public defaultMiddlewaresDistribution: any;
    public middlewaresDistribution: any;

    public searchSuggestions_instance: SearchSuggestions;
    public searchResults_instance: SearchResults;
    constructor() {
        super();
        this.routerInstance = express.Router();
        this.routerInstanceAuthentification = express.Router();
        this.searchSuggestions_instance = SearchSuggestions.getInstance();
        this.searchResults_instance = SearchResults.getInstance();
    }

    /**
     * Public routes init
     * Setup all the endpoint that can be reachable when no token is added to the header (public)
     * @return {express.Router} router for the public routes
     * @public @method
     */
    public setupPublicRoutes(): express.Router {

        this.routerInstance.get('/', [this.textSearchSuggestionsHandler.bind(this), this.routeSendResponse.bind(this)]);
        this.routerInstance.get('/results', [this.textSearchResultsHandler.bind(this), this.routeSendResponse.bind(this)]);
        this.routerInstance.get('/:linkId', [this.taxonomyLinkedEntitiesHandler.bind(this), this.routeSendResponse.bind(this)]);
        this.routerInstance.get('/:category/:slug', [this.taxonomyLinkedEntitiesByCatAndSlugHandler.bind(this), this.routeSendResponse.bind(this)]);
        return this.routerInstance;
    }

    public setupAuthRoutes(): express.Router {
        return this.routerInstance
    }

    public setupAdditionnalAuthRoutes(router: express.Router): express.Router {
        return router;
    }
    public setupAdditionnalPublicRoutes(router: express.Router): express.Router {
        return router;
    }

    /**
     * GetSearchOnParam
     * Handle the search and returns the full list of entity
     * @param req {Request}
     * @param res {Response}
     * @param next {NextFunction}
     * @return {Promise<any>}
     */
    public async textSearchResultsHandler(req: Request, res: Response, next: NextFunction): Promise<any> {
        const textSearchResults = await this.searchResults_instance.getTextSearchResult(req.query.searchIndex?.toString())
        //Send back full (DTO) of each entity search result in an array sorted,
        res.serviceResponse = SuccessResponse.create(textSearchResults, StatusCodes.OK, ReasonPhrases.OK);
        return next();
    }

    /**
     * getSearchSuggestion
     * Handle the search and returns only and overview about what would the full search return
     * @param req {Request}
     * @param res {Response}
     * @param next {NextFunction}
     * @return {Promise<any>}
     */
    public async textSearchSuggestionsHandler(req: Request, res: Response, next: NextFunction): Promise<any> {
        const textSearchSuggestions = await this.searchSuggestions_instance.getTextSearchSuggestions(req.query.searchIndex?.toString());
        res.serviceResponse = SuccessResponse.create(textSearchSuggestions, StatusCodes.OK, ReasonPhrases.OK);
        //res.serviceResponse = ErrorResponse.create(new Error, StatusCodes.INTERNAL_SERVER_ERROR, "SearchSuggestion failed to find with request error:"+e, [])
        return next();
    }

    public async taxonomyLinkedEntitiesHandler(req: Request, res: Response, next: NextFunction): Promise<any> {
        const linkedEntityToTaxonomyArray = await this.searchResults_instance.internalFindEntityLinkedToTaxonomy(req.params.linkId); 
        res.serviceResponse = SuccessResponse.create(linkedEntityToTaxonomyArray, StatusCodes.OK, ReasonPhrases.OK);
        //res.serviceResponse = ErrorResponse.create(new Error, StatusCodes.BAD_REQUEST, "Search TagResult failed to find entity linked to taxonomy with error: "+e, []);
        return next();
    }

    public async taxonomyLinkedEntitiesByCatAndSlugHandler(req:Request, res:Response, next: NextFunction):Promise<any> {
        const taxonomyLinkedEntities = await this.searchResults_instance.getLinkedEntitiesToTaxonomyByCatAndSlug(req.params.category, req.params.slug)
        res.serviceResponse = SuccessResponse.create(taxonomyLinkedEntities, StatusCodes.OK, ReasonPhrases.OK);
        //res.serviceResponse = ErrorResponse.create(new Error, StatusCodes.BAD_REQUEST, "Search TagResult failed to find entity linked to taxonomy with error: "+e, []);
        return next();
    }

}

export default SearchRoutes