

export default class ApiQuery {
    public name:string;
    public sort:any = {updatedAt : -1}
    public raw:any;
    public initQuery:any;
    public sections:Array<any>;
    private _transmuted:any;

    constructor(query:any) {
        this.raw = query;
        this.initQuery = query;
        this.sections = [];
    }

    public set transmuted(value) {
        this._transmuted = value;
    }

    public get transmuted() {
        this._transmuted = {
            ...this.raw
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