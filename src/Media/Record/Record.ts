import FileStorage from "../../Storage/Files/FileStorage";
import * as mime from "mime-types"


export default class Record {

    //Our params
    public filenameAndExt:string;
    public filenameNoExt:string;
    public pathWithFilename:string;
    public pathNoFilename:string;
    public url:string;
    public entityType:string;
    public entityId:string;
    public extension:string;
    public userId:string; //media -> uploadedBy

    //Media info
    public title:string;
    public alt:string;
    public description:string;
    public licence:string;
    public fileType:string;
    //public dbStatus:string;
    //public status:any;

    //Multer file props
    public m_fieldName:any;
    public m_originalname:any;
    public m_encoding:any;
    public m_mimetype:any;
    public m_size:any;
    public m_destination:any;
    public m_filename:any;
    public m_path:any;
    public m_buffer:any;


    constructor(req:any, res:any, entityId:string, mediaField:string, entityType:string){

        this.userId = req.user._id;

        const tryExt:string|false = mime.extension(req.file.mimetype);
        this.extension = (tryExt !== false ? tryExt : "");

        if(this.extension !== ""){
            this.filenameAndExt = FileStorage.generateFilename(
                [
                    mediaField,
                    this.userId,
                    FileStorage.getUniquePrefix(),
                    FileStorage.removeExtension(req.file.originalname)
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
                    req.file.originalname
                ],
                "");
            this.filenameAndExt = this.filenameNoExt;
        }
        this.entityType = entityType;
        this.entityId = entityId;
        this.pathNoFilename = FileStorage.generatePath(this.entityType, this.entityId);
        this.pathWithFilename = this.pathNoFilename + '/' + this.filenameAndExt;

        this.url = "/medias/"+ this.entityType + "/" + this.entityId + "/" + this.filenameAndExt;

        //Media info
        if(req.body.data.media !== undefined){
            this.title = req.body.data.title
            this.alt = req.body.data.alt
            this.description = req.body.data.description
            this.licence = req.body.data.licence
            this.fileType = req.body.data.fileType
        }

        //Multer file props
        if(req.file !== undefined){
            this.m_fieldName = req.file.fieldName
            this.m_originalname = req.file.originalname
            this.m_encoding = req.file.encoding
            this.m_mimetype = req.file.mimetype
            this.m_size = req.file.size
            this.m_destination = req.file.destination
            this.m_filename = req.file.filename
            this.m_path = req.file.path
            this.m_buffer = req.file.buffer
        }
        
    }

    public isValid():boolean {
        //Check if record is valid for use (has enough basic properties)
        return true
    }


}