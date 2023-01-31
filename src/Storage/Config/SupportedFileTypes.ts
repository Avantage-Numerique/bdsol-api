import * as mime from "mime-types";

export default class SupportedFileTypes {

    static _instance: SupportedFileTypes;

    public _supportedMimeTypes:Array<string>;
    public _extensionsList:any;

    constructor(list:Array<string>) {
        this._supportedMimeTypes = list;
        this._extensionsList = {};
    }

    /**
     * @static @static @method getInstance Create the singleton instance if not existing
     * @return {SupportedFileTypes} singleton instance of the constructor
     */
    static getInstance(list:Array<string>): SupportedFileTypes {
        if (SupportedFileTypes._instance === undefined) {
            SupportedFileTypes._instance = new SupportedFileTypes(list);
        }
        return SupportedFileTypes._instance;
    }


    public get supportedMimeTypes():Array<string> {
        return this._supportedMimeTypes;
    }


    public extension(mimetype:string):string {
        if (this._supportedMimeTypes.includes(mimetype)) {
            const extension:string|false = mime.extension(mimetype);
            return extension === false ? "" : extension;
        }
        return "";
    }


    public setExtensionsList():Array<any> {
        if (this._extensionsList.length === 0) {
            for (let mimetype in this._supportedMimeTypes) {
                if (!this._extensionsList[mimetype].length) {
                    this._extensionsList[mimetype] = [];
                }
                if (this.extension(mimetype) !== "") {
                    this._extensionsList[mimetype].push();
                }
            }
        }
        return this._extensionsList;
    }

}