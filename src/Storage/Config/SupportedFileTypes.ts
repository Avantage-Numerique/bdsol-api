import * as mime from "mime-types";

export default class SupportedFileTypes {

    static _instance: SupportedFileTypes;

    public _mimeTypes:Array<string>;
    public _extensions:any;

    constructor(mimeTypes:Array<string>) {
        this._mimeTypes = mimeTypes;
        this._extensions = {};
        this.buildExtensionsList();
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


    /**
     * Getter of the supported MimeTypes
     */
    public get mimeTypes():Array<string> {
        return this._mimeTypes;
    }


    /**
     * Get extension of the target mimetype
     * @param mimetype {string}
     * @return {string}
     */
    public extension(mimetype:string):string {
        if (this._mimeTypes.includes(mimetype)) {
            const extension:string|false = mime.extension(mimetype);
            return extension === false ? "" : extension;
        }
        return "";
    }


    /**
     * @return {Array<any>} Return the `mimetypes.extensions` object.
     */
    public buildExtensionsList():Array<any> {
        if (this._extensions.length === 0) {
            for (let mimetype in this._mimeTypes) {
                if (!this._extensions[mimetype].length) {
                    this._extensions[mimetype] = [];
                }
                if (this.extension(mimetype) !== "") {
                    this._extensions[mimetype].push();
                }
            }
        }
        return this._extensions;
    }

}