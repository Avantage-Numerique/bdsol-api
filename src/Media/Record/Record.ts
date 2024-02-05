import FileStorage from "../../Storage/Files/FileStorage";
import * as mime from "mime-types"
import mongoose from "mongoose";
import PublicStorage from "@src/Storage/Files/PublicStorage";


export default class Record {

    //Our params
    public filenameAndExt:string;
    public filenameNoExt:string;
    public pathWithFilename:string;
    public pathNoFilename:string;
    public url:string;
    public entityType:string;//This is now need to be as the Entity model name in Db.
    public entityTypePath:string;//This is now need to be as the Entity model name in Db.
    public entityId:string;
    public extension:string;
    public userId:string; //media -> uploadedBy
    public mediaField;

    //Media info
    public title:string;
    public alt:string;
    public description:string;
    public licence:string;
    public fileType:string;
    //public dbStatus:string;
    //public meta:any;

    //Multer file props
    public file_fieldName:any;
    public file_originalname:any;
    public file_encoding:any;
    public file_mimetype:any;
    public file_size:any;
    public file_destination:any;
    public file_filename:any;
    public file_path:any;
    public file_buffer:any;


    constructor(data:any, files:any, userId:any, entityId:string, mediaField:string, entityType:string){

        const file = files[mediaField][0];
        this.userId = userId;
        this.mediaField = mediaField;

        const tryExt:string|false = mime.extension(file.mimetype);
        this.extension = (tryExt !== false ? tryExt : "");

        if(this.extension !== ""){
            this.filenameAndExt = FileStorage.generateFilename(
                [
                    mediaField,
                    this.userId,
                    FileStorage.getUniquePrefix(),
                    FileStorage.removeExtension(file.originalname)
                ],
                this.extension
            )
            this.filenameNoExt = FileStorage.removeExtension(this.filenameAndExt);
        }
        else{
            this.filenameNoExt = FileStorage.generateFilename(
                [
                    mediaField,
                    this.userId,
                    FileStorage.getUniquePrefix(),
                    file.originalname
                ],
                "");
            this.filenameAndExt = this.filenameNoExt;
        }
        this.entityType = entityType;
        this.entityTypePath = entityType.toLowerCase();
        this.entityId = entityId;
        this.pathNoFilename = FileStorage.generatePath(this.entityTypePath, this.entityId, PublicStorage.basePath);// I did add the third parameters for relative purposes, but it's weird.
        this.pathWithFilename = this.pathNoFilename + '/' + this.filenameAndExt;

        this.url = "/medias/"+ this.entityTypePath + "/" + this.entityId + "/" + this.filenameAndExt;

        //Media info
        if(data !== undefined){
            this.title = data.title
            this.alt = data.alt
            this.description = data.description
            this.licence = data.licence
            this.fileType = data.fileType
        }

        //Multer file props (transformed req.files)
        if(file !== undefined){
            this.file_fieldName = file.fieldName
            this.file_originalname = file.originalname
            this.file_encoding = file.encoding
            this.file_mimetype = file.mimetype
            this.file_size = file.size
            this.file_destination = file.destination
            this.file_filename = file.filename
            this.file_path = file.path
            this.file_buffer = file.buffer
        }
    }

    public isValid():boolean {
        //Check if record is valid for use (has enough basic properties)

        try {
            new mongoose.Types.ObjectId(this.entityId)
        }
        catch(err){
            return false;
        }
        return true
    }


}