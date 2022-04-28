/**
 * Check this maybe : https://www.npmjs.com/package/mongoose-beautiful-unique-validation
 * et ceci https://masteringjs.io/tutorials/mongoose/unique
 */
export default class MongoError {

    /*
    "name": "MongoError",
    "message": "insertDocument :: caused by :: 11000 E11000 duplicate key error index: example.users.$name_1 dup key: { : \"John\" }",
    "index": 0,
    "code": 11000,
    "errmsg": "insertDocument :: caused by :: 11000 E11000 duplicate key error index: example.users.$name_1 dup key: { : \"John\" }"
}
     */
    private _raw:object;
    private _name:string;
    private _message:string;
    private _index:number;
    private _code:number;
    private _errormsg:string;

    constructor(e:object) {
        this._raw = e;
    }

    // GETTER / SETTER

    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }

    public get message(): string {
        return this._message;
    }
    public set message(value: string) {
        this._message = value;
    }

    public get index(): number {
        return this._index;
    }
    public set index(value: number) {
        this._index = value;
    }

    public get code(): number {
        return this._code;
    }
    public set code(value: number) {
        this._code = value;
    }

    public get errormsg(): string {
        return this._errormsg;
    }
    public set errormsg(value: string) {
        this._errormsg = value;
    }

}