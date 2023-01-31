/**
 * Get the Media single file limit to add as option in a storage options object.
 */
export default class FileLimits implements FileLimitsContract {

    static _instance: FileLimitsContract;

    //most commoon
    public fields:number;
    public fileSize:number;

    //more precise, so less common.
    public fieldNameSize:number;
    public fieldSize:number;
    public files:number;
    public parts:number;
    public headerPairs:number;


    constructor($limits:any) {
        FileLimits.prototype.toString = this.toString;
        this._assignValues($limits);
    }


    /**
     * Assign the parameters to the class's properties
     * @param $limits
     * @protected
     */
    protected _assignValues($limits:any):void {
        for (let option in $limits) {
            if (this.hasOwnProperty(option)) {
                this[option as keyof this] = $limits[option];
            }
        }
    }


    /**
     * @static @static @method getInstance Create the singleton instance if not existing
     * @return {FileLimits} singleton instance of the constructor
     */
    static getInstance($limits:any): FileLimitsContract {
        if (FileLimits._instance === undefined) {
            FileLimits._instance = new FileLimits($limits);
        }
        return FileLimits._instance;
    }


    /**
     * toString method overwriten with MediaSingleLimits
     * @return {string}
     */
    public toString():string {
        let stringValue:Array<string> = [`${this.constructor.name}`];

        for (let option in this) {
            stringValue.push(`${option} (${this[option as keyof this]})`);
        }
        return stringValue.join(", ");
    }
}