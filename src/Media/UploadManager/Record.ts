import { RecordContract } from "./RecordContract";


export default class Record implements RecordContract {
    public file:BinaryData;
    public type:string;
    public fileName:string;
    public extension:string;
    public path:string;

    constructor(file:BinaryData, type:string, fileName:string, extension:string, path:string){
        //Return error if wrong?
        this.file = file;
        this.type = type;
        this.fileName = fileName;
        this.extension = extension;
        this.path = path;
    }

}