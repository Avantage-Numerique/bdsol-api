import express, {NextFunction, Request, Response} from "express";
import {StatusCodes} from "http-status-codes";
import Person from "../../Persons/Models/Person";
import Organisation from "../../Organisations/Models/Organisation";
import mongoose from "mongoose";
import Taxonomy from "../../Taxonomy/Models/Taxonomy";
import { ErrorResponse } from "../../Http/Responses/ErrorResponse";
import { SuccessResponse } from "../../Http/Responses/SuccessResponse";
import { ReasonPhrases } from "http-status-codes";
import AbstractRoute from "../../Abstract/Route";
import Project from "../../Projects/Models/Project";

class SearchRoutes extends AbstractRoute {

    public routerInstance: express.Router;
    public routerInstanceAuthentification: express.Router;
    public controllerInstance: any;
    public defaultMiddlewaresDistribution: any;
    public middlewaresDistribution: any;

    constructor() {
        super();
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

        this.routerInstance.get('/', [this.getSearchSuggestion.bind(this), this.routeSendResponse.bind(this)]);
        this.routerInstance.get('/results', [this.getSearchOnParam.bind(this), this.routeSendResponse.bind(this)]);
        this.routerInstance.get('/:linkId', [this.getTagResult.bind(this), this.routeSendResponse.bind(this)]);
        this.routerInstance.get('/:category/:slug', [this.getTaxonomyResult.bind(this), this.routeSendResponse.bind(this)]);
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
    public async getSearchOnParam(req: Request, res: Response, next: NextFunction): Promise<any> {
        //Send out $text : { $search : req.query } to all entity

        const personModel:any = Person.getInstance().mongooseModel;
        const organisationModel:any = Organisation.getInstance().mongooseModel;

        const promises = [];
        promises.push(
            await personModel.find(
                {$text: {$search: req.query.searchIndex}},
                {score: {$meta: "textScore"}}
            ));
        promises.push(
            await organisationModel.find(
                {$text: {$search: req.query.searchIndex}},
                {score: {$meta: "textScore"}}
            ));

        let objectResultArray;
        if(promises.length > 0){
            objectResultArray = promises.flat().map( (el) => {
                return JSON.stringify(el.toJSON());
            }).map( (str) => {
                return JSON.parse(str);
            });
            //Would love to merge sort the results :) but this more easy V
            objectResultArray.sort( function(a,b) { return b.score - a.score });
        }
            
        //Send back full (DTO) of each entity search result in an array sorted,
        res.serviceResponse = SuccessResponse.create(objectResultArray, StatusCodes.OK, ReasonPhrases.OK);
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
    public async getSearchSuggestion(req: Request, res: Response, next: NextFunction): Promise<any> {

        try {
            const personModel:any = Person.getInstance().mongooseModel;
            const organisationModel:any = Organisation.getInstance().mongooseModel;
            const taxonomyModel:any = Taxonomy.getInstance().mongooseModel;
            const projectModel:any = Project.getInstance().mongooseModel;
            
            const personsSuggestions = await personModel.find(
                { $or: [
                    { firstName: { $regex: req.query.searchIndex, $options : 'i' }},
                    { lastName: { $regex: req.query.searchIndex, $options : 'i' }},
                    { nickname: { $regex: req.query.searchIndex, $options : 'i' }},
                    { description: { $regex: req.query.searchIndex, $options : 'i' }},
                ]}
            )
                
            const organisationsSuggestions = await organisationModel.find(
                { $or: [
                    { name: { $regex: req.query.searchIndex, $options : 'i' }},
                    { description: { $regex: req.query.searchIndex, $options : 'i' }},
                ]}
            )
                
            const projectSuggestions = await projectModel.find(
                { $or: [
                    { name: { $regex: req.query.searchIndex, $options : 'i' }},
                    { alternateName: { $regex: req.query.searchIndex, $options : 'i' }},
                ]}
            )

            const taxonomySuggestions = await taxonomyModel.find(
                { name: { $regex : req.query.searchIndex, $options : 'i' }}
            )


            //Handle if taxonomy is exactly SearchIndex
            const taxonomyExactMatchIndex = taxonomySuggestions.findIndex( (taxo:any) => { return taxo.name.toLowerCase() == req?.query?.searchIndex?.toString().toLowerCase() } )
            let taxonomyExactMatch = [];
            let linkedEntityToExactMatch:any = [];
            if (taxonomyExactMatchIndex >= 0) {
                taxonomyExactMatch = taxonomySuggestions.splice(taxonomyExactMatchIndex, 1);
                
                //Handle linked taxonomy if exact match
                console.log(taxonomyExactMatch)
                linkedEntityToExactMatch = await SearchRoutes.internalFindEntityLinkedToTaxonomy(taxonomyExactMatch[0]._id)
            }

            //Send back DTO of fewest field of each entity search result in an array sorted,
            if(taxonomyExactMatch.length > 0)
            {
                //If taxonomy match, fetch entity that have this taxonomy
                res.serviceResponse = SuccessResponse.create([ ...taxonomyExactMatch, ...linkedEntityToExactMatch, ...personsSuggestions, ...organisationsSuggestions, ...projectSuggestions, ...taxonomySuggestions], StatusCodes.OK, ReasonPhrases.OK);
            }
            else    
                res.serviceResponse = SuccessResponse.create([...personsSuggestions, ...organisationsSuggestions, ...projectSuggestions, ...taxonomySuggestions], StatusCodes.OK, ReasonPhrases.OK);
        }
        catch(e){
            res.serviceResponse = ErrorResponse.create(new Error, StatusCodes.INTERNAL_SERVER_ERROR, "SearchSuggestion failed to find with request error:"+e, [])
        }
        return next();
    }

    public async getTagResult(req: Request, res: Response, next: NextFunction): Promise<any> {
        try{
            const searchResult = await SearchRoutes.internalFindEntityLinkedToTaxonomy(req.params.linkId); 
            res.serviceResponse = SuccessResponse.create(searchResult, StatusCodes.OK, ReasonPhrases.OK);
        }
        catch(e)
        {
            res.serviceResponse = ErrorResponse.create(new Error, StatusCodes.BAD_REQUEST, "Search TagResult failed to find entity linked to taxonomy with error: "+e, []);
        }
        return next();
    }

    public async getTaxonomyResult(req:Request, res:Response, next: NextFunction):Promise<any> {

        const taxonomyModel:any = Taxonomy.getInstance().mongooseModel;
        try {
            let taxonomyId = await taxonomyModel.find(
                {
                    category: req.params.category,
                    slug: req.params.slug
                }
            );
            taxonomyId = taxonomyId.shift()._id;

            if (taxonomyId){
                const searchResult = await SearchRoutes.internalFindEntityLinkedToTaxonomy(taxonomyId);
                res.serviceResponse = SuccessResponse.create(searchResult, StatusCodes.OK, ReasonPhrases.OK);
            }                
        }
        catch(e)
        {
            res.serviceResponse = ErrorResponse.create(new Error, StatusCodes.BAD_REQUEST, "Search TagResult failed to find entity linked to taxonomy with error: "+e, []);
        }
        return next();
    }

    public static async internalFindEntityLinkedToTaxonomy(taxonomyId:string){
        const personModel:any = Person.getInstance().mongooseModel;
        const organisationModel:any = Organisation.getInstance().mongooseModel;
        const projectModel:any = Project.getInstance().mongooseModel;
        try{
            console.log("idtaxo",taxonomyId)
            const paramId = new mongoose.Types.ObjectId(taxonomyId);
            const promises = [];
            promises.push(
                await personModel.find(
                    {
                        $or: [
                            {"occupations.skills": paramId},
                            {"domains.domain": paramId},
                        ]
                    }
                ));
            promises.push(
                await organisationModel.find(
                    {
                        $or: [
                            {"offers.skills": paramId},
                            {"domains.domain": paramId},
                        ]
                    }
                ));
            promises.push(
                await projectModel.find(
                    { "skills": paramId }
                )
            )
    
            let tagSearchResult = [];
            if(promises.length > 0) {
                 tagSearchResult = promises.flat();
            }
            console.log("tagresults", tagSearchResult)
            return tagSearchResult;
        }
        catch(e)
        {
            return e;
        }
    }

}

export default SearchRoutes