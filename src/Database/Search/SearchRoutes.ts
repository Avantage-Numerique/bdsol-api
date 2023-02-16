import express, {Request, Response} from "express";
import {StatusCodes} from "http-status-codes";
import Person from "../../Persons/Models/Person";
import Organisation from "../../Organisations/Models/Organisation";
import mongoose from "mongoose";
import Taxonomy from "../../Taxonomy/Models/Taxonomy";
import { ErrorResponse } from "../../Http/Responses/ErrorResponse";
import { SuccessResponse } from "../../Http/Responses/SuccessResponse";
import { ReasonPhrases } from "http-status-codes";

class SearchRoutes {

    public routerInstance: express.Router;
    public routerInstanceAuthentification: express.Router;

    constructor() {
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
        this.routerInstance.get('/:linkId', this.getTagResult);
        this.routerInstance.get('/:category/:slug', this.getTaxonomyResult);
        return this.routerInstance;
    }

    public setupAuthRoutes(): express.Router {
        return this.routerInstance
    }

    /**
     * GetSearchOnParam
     * Handle the search and returns the full list of entity
     * @param req {Request}
     * @param res {Response}
     * @return {Promise<any>}
     */
    public async getSearchOnParam(req: Request, res: Response): Promise<any> {
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
        return res.status(StatusCodes.OK).send(SuccessResponse.create(
            objectResultArray,
            StatusCodes.OK,
            ReasonPhrases.OK
        ));
        //return SuccessResponse.create(objectResultArray, StatusCodes.OK, ReasonPhrases.OK);
    }

    /**
     * getSearchSuggestion
     * Handle the search and returns only and overview about what would the full search return
     * @param req {Request}
     * @param res {Response}
     * @return {Promise<any>}
     */
    public async getSearchSuggestion(req: Request, res: Response): Promise<any> {

        try {
            const personModel:any = Person.getInstance().mongooseModel;
            const organisationModel:any = Organisation.getInstance().mongooseModel;
            
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
                    
            //Send back DTO of fewest field of each entity search result in an array sorted,
            return res.status(StatusCodes.OK).send(SuccessResponse.create(
                [...personsSuggestions, ...organisationsSuggestions],
                StatusCodes.OK,
                ReasonPhrases.OK
            ));
        }
        catch(e){
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Send with searchIndex as param");
        }
    }

    public async getTagResult(req: Request, res: Response): Promise<any> {
        try{
            const searchResult = await SearchRoutes.internalFindEntityLinkedToTaxonomy(req.params.linkId); 
            return res.status(StatusCodes.OK).send(SuccessResponse.create(
                searchResult,
                StatusCodes.OK,
                ReasonPhrases.OK
            ));
        }
        catch(e)
        {
            return res.status(StatusCodes.BAD_REQUEST).send(ErrorResponse.create(
                new Error(ReasonPhrases.BAD_REQUEST),
                StatusCodes.BAD_REQUEST,
                "Data non valide",
                []
            ));
        }
    }

    public async getTaxonomyResult(req:Request, res:Response):Promise<any> {

        const taxonomyModel:any = Taxonomy.getInstance().mongooseModel;
        try{
            let taxonomyId = await taxonomyModel.find(
                {
                    category: req.params.category,
                    slug: req.params.slug
                }
            );
            taxonomyId = taxonomyId.shift()._id;

            if (taxonomyId){
                const searchResult = await SearchRoutes.internalFindEntityLinkedToTaxonomy(taxonomyId);
                return res.status(StatusCodes.OK).send(SuccessResponse.create(
                    searchResult,
                    StatusCodes.OK,
                    ReasonPhrases.OK
                ));
            }
        }
        catch(e)
        {
            return res.status(StatusCodes.BAD_REQUEST).send(ErrorResponse.create(
                new Error(ReasonPhrases.BAD_REQUEST),
                StatusCodes.BAD_REQUEST,
                "Data non valide",
                []
            ));
        }
    }

    public static async internalFindEntityLinkedToTaxonomy(taxonomyId:string){
        const personModel:any = Person.getInstance().mongooseModel;
        const organisationModel:any = Organisation.getInstance().mongooseModel;
        try{
            const paramId = new mongoose.Types.ObjectId(taxonomyId);
            const promises = [];
            promises.push(
                await personModel.find(
                    { "occupations.occupation": paramId }
                ));
            promises.push(
                await organisationModel.find(
                    { "offers.offer": paramId },
                ));
    
            let tagSearchResult = [];
            if(promises.length > 0){
                 tagSearchResult = promises.flat();
            }
            return tagSearchResult;
        }
        catch(e)
        {
            return e;
        }
    }

}

export default SearchRoutes