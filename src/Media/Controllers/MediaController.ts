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

    private file:BinaryData;
    private type:string;//image, video, sound
    private fileName:string;
    private extension:string;
    private path:string;
    private files:Array<any>;


    public save(file:BinaryData, type:string, fileName:string, extension:string, path:string) {
        this.file = file;
        this.type = type;
        this.fileName = fileName;
        this.extension = extension;
        this.path = path;
    }

    public uploadFile():boolean{
        //If file not defined properly
        if (this.file == undefined ||
            this.type == undefined ||
            this.fileName == undefined ||
            this.extension == undefined ||
            this.path == undefined
            ){ return false; }

        let isUploaded = false;
        //Need type of file (img, video, sound)
        //Need file to save
        //Need path for the file
        //Need extension of the file
        //Need fileName
        //Maybe need property of the entity that the media need to be save for (mainImage)

        /*Could pass the database saved object and deconstruct it here
            but for it to be standalone, would prefer having all of the above as params
            or determined inside the function
        */

        //Todo:
        //Save to the path, the file with the name fileName (date?) with extension
        switch(this.type){
            case "image": isUploaded = this.uploadImage();break;
            case "video": isUploaded = this.uploadVideo();break;
            case "sound": isUploaded = this.uploadSound();break;
            default: return false
        }

        return isUploaded;
    }

    private uploadImage():boolean{return true;}
    private uploadVideo():boolean{return true;}
    private uploadSound():boolean{return true;}
    
}

export default MediaController;