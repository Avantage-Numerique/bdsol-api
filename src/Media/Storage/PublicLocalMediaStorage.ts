import PublicStorage from "../../Storage/Files/PublicStorage";

/**
 *
 */
class PublicLocalMediaStorage {

    private _destination:string = PublicStorage.destination;

    public getMulterDiskStorageConfig():any {
        return {
            destination: this.destination,
            filename: (req:any, file:any, cb:any) => cb(null, this.filename(file)),
        }
    }


    public filename(file:any) {
        return file.originalname;
    }


    public set destination(value:string) {
        this._destination = value;
    }


    public get destination():string {
        return this._destination;
    }

    /*
    private filenameCallback(req:Request, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }

    public getStorageOptions():any {
        return {
            destination: this.destination,
            filename: this.filename
        };
    }*/

    /**
     * File information
     *
     * Each file contains the following information:
     * Key    Description    Note
     * fieldname    Field name specified in the form     
     * originalname    Name of the file on the user’s computer     
     * encoding    Encoding type of the file     
     * mimetype    Mime type of the file     
     * size    Size of the file in bytes     
     * destination    The folder to which the file has been saved    DiskStorage
     * filename    The name of the file within the destination    DiskStorage
     * path    The full path to the uploaded file    DiskStorage
     * buffer    A Buffer of the entire file    MemoryStorage
     */
}