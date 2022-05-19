import {Service} from "../../Database/Service";
import type {ApiEndPointsControllerContract} from "../Contracts/ApiEndPointsControllerContract";
import {ApiResponseContract} from "../Responses/ApiResponse";

/**
 * This is setup to implement and dry the Controllers of authenfication and deep API mecanisms.
 * This should call a controller method
 */
abstract class ApiEndPointsController implements ApiEndPointsControllerContract {

    public service:Service|any;

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
}