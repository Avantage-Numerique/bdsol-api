import express, {NextFunction, Request, Response} from "express";
import {ReasonPhrases, StatusCodes} from "http-status-codes";
import {SuccessResponse} from "@src/Http/Responses/SuccessResponse";
import AbstractRoute from "@core/Route";
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

        this.routerInstance.get('/', [this.fullSearchHandler.bind(this), this.routeSendResponse.bind(this)]);
        this.routerInstance.get('/all', [this.aggregateAllHandler.bind(this), this.routeSendResponse.bind(this)]);
        this.routerInstance.get('/regex', [this.textSearchSuggestionsHandler.bind(this), this.routeSendResponse.bind(this)]);
        this.routerInstance.get('/text', [this.textSearchResultsHandler.bind(this), this.routeSendResponse.bind(this)]);
        this.routerInstance.get('/nearestTaxonomy', [this.nearTaxonomyToSearchIndex.bind(this), this.routeSendResponse.bind(this)]);
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


    public async fullSearchHandler(req:Request, res: Response, next: NextFunction): Promise<any> {
        let textSearchResults = await this.searchResults_instance.getTextSearchResult(req.query.searchIndex?.toString());
        const regexSearchResults = await this.searchSuggestions_instance.getTextSearchSuggestions(req.query.searchIndex?.toString())
        
        if (textSearchResults == undefined)
            textSearchResults = [];
        
        const uniqueResults:any[] = [];
        const combinedResults:any[] = [...textSearchResults, ...regexSearchResults];
        combinedResults.forEach((elem) => {
            if(!uniqueResults.some(unique => unique._id == elem._id))
                uniqueResults.push(elem);
        })

        res.serviceResponse = SuccessResponse.create(uniqueResults, StatusCodes.OK, ReasonPhrases.OK);
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

    public async nearTaxonomyToSearchIndex(req:Request, res:Response, next: NextFunction):Promise<any> {
        const nearTaxonomy = await this.searchSuggestions_instance.findNearTaxonomy(req.query.searchIndex?.toString())
        let linkedEntityToNearestTaxonomy = [];
        //Find linked entity if nearestTaxo exist
        if(nearTaxonomy?.nearestTaxonomy?._id != undefined)
            linkedEntityToNearestTaxonomy = await this.searchResults_instance.findEntityLinkedToTaxonomy(nearTaxonomy.nearestTaxonomy._id);
        
        const nearTaxonomyResponseObject = { ...nearTaxonomy, linkedEntityToNearestTaxonomy: linkedEntityToNearestTaxonomy }
        res.serviceResponse = SuccessResponse.create(nearTaxonomyResponseObject, StatusCodes.OK, ReasonPhrases.OK);
        return next();
    }

    public async taxonomyLinkedEntitiesHandler(req: Request, res: Response, next: NextFunction): Promise<any> {
        const linkedEntityToTaxonomyArray = await this.searchResults_instance.findEntityLinkedToTaxonomy(req.params.linkId);
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

    public async aggregateAllHandler(req:Request, res:Response, next: NextFunction):Promise<any> {
        return next();
    }


}

export default SearchRoutes