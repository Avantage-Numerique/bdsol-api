import AbstractController from "../../Abstract/Controller";
import PersonsService from "../../Persons/Services/PersonsService";
import MediasService from "../Services/MediasService";
import Media from "../Models/Media";
import {ControllerContract} from "../../Abstract/Contracts/ControllerContract";
import {SuccessResponse} from "../../Http/Responses/SuccessResponse";
import {StatusCodes} from "http-status-codes";

class MediaController extends AbstractController implements ControllerContract {

    /** @private @static Singleton instance */
    private static _instance:ControllerContract;

    /** @public PersonsService */
    service:PersonsService;

    /** @public Model */
    entity:Media;

    name:string = "Persons";

    constructor() {
        super();
        this.entity = Media.getInstance();
        this.service = MediasService.getInstance(this.entity);
    }

    /**
     * @public @static @method getInstance Create the singleton instance if not existing
     * @return {PersonsController} Controller singleton constructor
     */
    public static getInstance():ControllerContract {
        if (MediaController._instance === undefined) {
            MediaController._instance = new MediaController();
        }
        return MediaController._instance;
    }

    public basepath(requestData:any) {
        return SuccessResponse.create({"basepath":"truetrue"}, StatusCodes.OK, "asdasdasd");
    }
}

export default MediaController;