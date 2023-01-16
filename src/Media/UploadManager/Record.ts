import mongoose from "mongoose";
import { Status } from "../../Database/Schemas/StatusSchema";

export default class Record {
    
    //Multer file information :

    //Field name specified in the form
    public fieldname:any
    //Name of the file on the user's computer
    public originalname:any
    //Encoding type of the file
    public encoding:any
    //Mime type of the file
    public mimetype:any
    //Size of the file in bytes
    public size:any
    //The folder to which the file has been saved | `DiskStorage`
    public destination:any
    //The name of the file within the `destination` | `DiskStorage`
    public filename:any
    //The full path to the uploaded file | `DiskStorage`
    public path:any
    //A `Buffer` of the entire file | `MemoryStorage`
    public buffer:any

    //BDSOL information needed

    //Title of the media
    public title: string;
    //alt text to show
    public alt: string;
    //description of media
    public description: string;
    //Path to retrieve image
    //public path: string;
    //Licence to apply on the media
    public licence: string;
    //"image", "video", "sound"
    public fileType: string;
    //Extension of the file
    public extension: string;
    //Slug auto generated
    //public slug: string;
    //The id of the entity it belongs to
    public entityId: mongoose.ObjectId;
    //Type of entity that it belongs to
    public entityType: string;
    //User that uploaded it
    public uploadedBy: mongoose.ObjectId;
    //Status
    public status: Status;


    //constructor(){}

}