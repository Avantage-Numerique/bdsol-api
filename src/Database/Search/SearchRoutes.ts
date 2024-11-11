import express, {NextFunction, Request, Response} from "express";
import {query} from "express-validator";
import {ReasonPhrases, StatusCodes} from "http-status-codes";
import {SuccessResponse} from "@src/Http/Responses/SuccessResponse";
import AbstractRoute from "@core/Route";
import SearchSuggestions from "./SearchSuggestions";
import SearchResults from "./SearchResults";
import {isInEnumSanitizerAlias} from "@src/Security/SanitizerAliases/IsInEnumSanitizerAlias";
import {EntityTypesEnum} from "@src/Entities/EntityTypes";
import {IntegerSanitizerAlias} from "@src/Security/SanitizerAliases/IntegerSanitizerAlias";
import {urlSanitizerAlias} from "@src/Security/SanitizerAliases/UrlSanitizerAlias";
import {objectIdSanitizerAlias} from "@src/Security/SanitizerAliases/ObjectIdSanitizerAlias";
import { urlSanitizerSearchAlias } from "@src/Security/SanitizerAliases/UrlSanitizerSearchAlias";

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
        this.routerInstance.get('/homepage', [
            this.fetchHomePageEntityHandler.bind(this),
            this.routeSendResponse.bind(this)
        ]);
        this.routerInstance.post('/type', [
            isInEnumSanitizerAlias('data.type', EntityTypesEnum),
            IntegerSanitizerAlias('data.skip'),
            this.searchByTypeHandler.bind(this),
            this.routeSendResponse.bind(this)
        ]);
        this.routerInstance.get('/', [
            urlSanitizerSearchAlias('searchIndex', true, query),//query.searchIndex
            this.fullSearchHandler.bind(this),
            this.routeSendResponse.bind(this)
        ]);
        //désactivé ?
        this.routerInstance.get('/all', [
            this.aggregateAllHandler.bind(this),
            this.routeSendResponse.bind(this)
        ]);
        //query.searchIndex
        this.routerInstance.get('/regex', [
            urlSanitizerAlias('searchIndex', true, query),
            this.textSearchSuggestionsHandler.bind(this),
            this.routeSendResponse.bind(this)
        ]);
        //query.searchIndex
        this.routerInstance.get('/text', [
            urlSanitizerAlias('searchIndex', true, query),
            this.textSearchResultsHandler.bind(this),
            this.routeSendResponse.bind(this)
        ]);
        //query.searchIndex
        this.routerInstance.get('/nearestTaxonomy', [
            urlSanitizerAlias('searchIndex', true, query),
            this.nearTaxonomyToSearchIndex.bind(this),
            this.routeSendResponse.bind(this)
        ]);
        //req.params.linkId
        this.routerInstance.get('/:linkId', [
            objectIdSanitizerAlias('linkId', false, query),
            this.taxonomyLinkedEntitiesHandler.bind(this),
            this.routeSendResponse.bind(this)
        ]);
        //req.params.category, req.params.slug
        this.routerInstance.get('/:category/:slug', [
            urlSanitizerAlias('category', false, query),
            urlSanitizerAlias('slug', false, query),
            this.taxonomyLinkedEntitiesByCatAndSlugHandler.bind(this),
            this.routeSendResponse.bind(this)
        ]);
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

    public async fetchHomePageEntityHandler(req:Request, res: Response, next: NextFunction): Promise<any>{
        res.serviceResponse = SuccessResponse.create(await this.searchResults_instance.fetchHomePageEntity(), StatusCodes.OK, ReasonPhrases.OK)
        return next();
    }

    public async searchByTypeHandler(req:Request, res: Response, next: NextFunction): Promise<any> {
        const type:string = req.body?.data?.type ?? "";
        const skip:number = req.body?.data?.skip ?? 0;
        const limit:number = req.body?.data?.limit ?? 25;
        /* const categories = {
            domains : req.body?.data?.domains ?? "",
            technologies : req.body?.data?.technologies ?? "",
            skills : req.body?.data?.skills ?? ""
        } */
        if(typeof type === 'string'){
            res.serviceResponse = await this.searchResults_instance.searchByType(type, skip, limit)//, categories)
        }

        const count = await this.searchResults_instance.countByType(type);
        res.serviceResponse.meta = {pagination :
            { 
                count : count?.data,
                skipped: skip,
                limit: limit,
                type: type,
                pageCount: Math.ceil(count?.data / limit),
                currentPage: Math.ceil(skip / limit) + 1,
            }
        }
        return next();
    }

    public async fullSearchHandler(req:Request, res: Response, next: NextFunction): Promise<any> {
        const searchIndex = req.query.searchIndex ? decodeURI(req.query.searchIndex.toString()) : "";
        let textSearchResults = await this.searchResults_instance.getTextSearchResult(searchIndex);
        const regexSearchResults = await this.searchSuggestions_instance.getTextSearchSuggestions(searchIndex)
        
        if (textSearchResults == undefined)
            textSearchResults = [];
        
        const uniqueResults:any[] = [];
        const combinedResults:any[] = [...textSearchResults, ...regexSearchResults];
        combinedResults.forEach((elem) => {
            if(!uniqueResults.some(unique => unique._id == elem._id))
                uniqueResults.push(elem);
        });

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
        const allEntityInOrder = await this.searchResults_instance.paginateTest();
        res.serviceResponse = SuccessResponse.create(allEntityInOrder, StatusCodes.OK, ReasonPhrases.OK);
        return next();
    }
}

export default SearchRoutes