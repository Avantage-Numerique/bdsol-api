import express, {Request, Response} from "express";
import {StatusCodes} from "http-status-codes";
import Person from "../../Persons/Models/Person";
import Organisation from "../../Organisations/Models/Organisation";
import LogHelper from "../../Monitoring/Helpers/LogHelper";

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
        ).lean();

        const organisationResults = await organisationModel.find(
            {$text: {$search: req.query.searchIndex}},
            {score: {$meta: "textScore"}}
        ).sort(
            {score: {$meta: "textScore"}}
        ).lean();

        //Sort by score
        const sortedResult = [...personsResults, ...organisationResults];
        //Would love to merge sort the results :) but this more easy V
        sortedResult.sort( function(a,b){ return b.score - a.score } );

        //Send back full (DTO) of each entity search result in an array sorted,
        return res.status(StatusCodes.OK).send(sortedResult)
    }

    /**
     * getSearchSuggestion
     * Handle the search and returns only and overview about what would the full search return
     * @param req {Request}
     * @param res {Response}
     * @return {Promise<any>}
     */
    public async getSearchSuggestion(req: Request, res: Response): Promise<any> {
        const personModel: any = Person.getInstance().mongooseModel;
        const organisationModel: any = Organisation.getInstance().mongooseModel;

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
        return res.status(StatusCodes.OK).send([...personsSuggestions, ...organisationsSuggestions]);
    }

}

export default SearchRoutes