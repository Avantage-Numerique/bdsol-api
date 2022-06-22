import {Service} from "../../Database/Service";
import type {ApiEndPointsControllerContract} from "../Contracts/ApiEndPointsControllerContract";
import {ApiResponseContract} from "../Responses/ApiResponse";
import LogHelper from "../../Monitoring/Helpers/LogHelper";
import {PersonnesController} from "../../Personnes/Controllers/PersonnesController";
import Validator from "../../Validation/Validator";
import Personne from "../../Personnes/Models/Personne";
import {ErrorResponse} from "../Responses/ErrorResponse";
import {ReasonPhrases, StatusCodes} from "http-status-codes";

/**
 * This is setup to implement and dry the Controllers of authenfication and deep API mecanisms.
 * This would call the controller method directly in the route definition to have like :
 * UsersRouter.post('/update', UsersController.updateEndpoint);
 */
abstract class ApiEndPointsController implements ApiEndPointsControllerContract {

    public service:Service|any;
    public controler:any;//ControllerContract
    public entity:any;//EntityContract;

    constructor(service:Service|any) {
        this.service = service;
    }

    /**
     * Setup the routes of this controller.
     * @protected
     */
    protected _setupRoutes():void {
        //Loop through an array of routes method ?
        //assign the method to the controller.
        //assign groups of middle to one or the other.
        //  Groups for now :
        //  - Auth : [Token middleware] applied to certain routes.
        //  - Log/Access : [To be implemented] applied to all routes.
    }

    abstract setupRoutes():void;

    //seulement au scope de la classe abstraite.
    public routeHandler(Req:any, res:any):any {
        ///const {data} = req.body;
        //const response:any = await methode(data);
        //return res.status(response.code).send(response);
    }

    async entityCreate(data:any):Promise<any> {
        //as the PersonneController avec les appels au service.
        return data;
    }


    /**
     * Call the route method for the target route.
     * @param route {string} the route string that will respond to this route.
     * @param method {string} the method to be call on the controller that will be this since it will extend that class.
     * @protected
     */
    protected _callRoute(route:string, method:string):any {
        //use a reflector here ?
        //check if method exist
        //this is a problem for the response type.
    }


    // QUESTIONS ?
    //  * Setup the crud methods too here ? Or create another level or extending ?


    //this could be too much of pain to debug :S
    protected async _create(requestData:any):Promise<ApiResponseContract> {
        return await this.create(requestData);
    }

    //this must be async too.
    abstract create(requestData:any):any;//response ?
    abstract delete(requestData:any):any;//response ?
    //etc.
}