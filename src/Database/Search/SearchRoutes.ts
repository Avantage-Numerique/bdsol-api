import express, {Request, Response} from "express";
import {StatusCodes} from "http-status-codes";
import Person from "../../Persons/Models/Person";
import Organisation from "../../Organisations/Models/Organisation";

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

        const personModel: any = Person.getInstance().mongooseModel;
        const organisationModel: any = Organisation.getInstance().mongooseModel;

        const personsResults = await personModel.find(
            {$text: { $search: req.query.searchIndex }},
            {score: {$meta: "textScore"}}
        ).sort(
            {score: {$meta: "textScore"}}
        );

        const organisationResults = await organisationModel.find(
            {$text: {$search: req.query.searchIndex}},
            {score: {$meta: "textScore"}}
        ).sort(
            {score: {$meta: "textScore"}}
        );

        
        //Send back full (DTO) of each entity search result in an array sorted,
        return res.status(StatusCodes.OK).send( [
            ...personsResults,
            ...organisationResults
          ].sort(
              //Would love to merge sort the results :) but this more easy V
              function(a,b){ return a.score - b.score } //Sort the resulting array
            )
        );
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