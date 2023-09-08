import config from "../../config";

/**
 * ApiQuery is the class that QUeryBuilder implements to generate a valid MongoDb query without having to use direct query structure.
 * @property name {string} WIP the name of the query. For the feature of caching query and be able to recall them.
 * @property sort {any} Sorting option. Default is set to updatedAt: -1.
 * @property skip {Number} To implement paging, this is the skip parameter. Default is set by config.query.defaultSkip.
 * @property limit {Number}The maximum return documents of the query config.query.defaultLimit.
 * @property raw {any} This contains the raw query.
 * @property initQuery {any} Copy of the initial query return via a route.
 * @property sections {Array<any>} The sections contained in the initQuery, used with logical params like or, and & in.
 * @property transmuted {any} The final query used in for search/list/etc.
 */
export default class ApiQuery {

    public name:string;
    public sort:any;
    public skip:number;
    public limit:number;
    public raw:any;
    public initQuery:any;
    public sections:Array<any>;
    private _transmuted:any;
    private _options:any;
    private _lookup:any;
    private _matches:any;
    private _projections:any;

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


    public set options(values) {
        this._options = values;
    }

    public get options() {
        this._options = {
            sort: this.sort,
            limit: this.limit,
            skip: this.skip
        }
        return this._options;
    }


    public set matches(values:any) {
        this._matches = values;
    }

    public get matches() {
        return this._matches;
    }


    public set lookup(values:any) {
        /*
        from: Collection,
        localField: current Model field to match the value of ForeignField,
        foreignField: The field to match the from collection,
        as: Name of the properties to push the data.,
         */
        this._lookup = values;
    }

    public get lookup() {
        return this._lookup;
    }


    public get projections() {
        return {};
    }
}