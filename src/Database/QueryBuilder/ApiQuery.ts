import config from "../../config";


export default class ApiQuery {
    public name:string;
    public sort:any;
    public skip:Number;
    public limit:Number;
    public raw:any;
    public initQuery:any;
    public sections:Array<any>;
    private _transmuted:any;

    /**
     *
     * @param query
     * @inheritDoc
     */
    constructor(query:any) {
        this.raw = query;
        this.initQuery = query;
        this.sections = [];
        this.sort = {updatedAt : -1};
        this.skip = Number(config.query.defaultSkip);
        this.limit = Number(config.query.defaultLimit);
    }

    public set transmuted(value) {
        this._transmuted = value;
    }

    public get transmuted() {
        this._transmuted = {
            ...this.raw,
            sort: this.sort,
            limit: this.limit,
            skip: this.skip
        }
        if (this.sections.length > 0) {
            for (const section of this.sections) {
                this._transmuted = {
                    ...this._transmuted,
                    ...section
                }
            }
        }
        return this._transmuted;
    }
}