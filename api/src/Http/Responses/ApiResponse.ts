
export interface ApiResponseContract {

    error:boolean;
    code:number;//statusCode - ?
    message:string;
    errors:Array<any>;
    data: object;
}

export default class ApiResponse implements ApiResponseContract {

    //public statusCode;
    protected _response:ApiResponseContract;
    protected _data:object;
    protected _code:number;
    protected _error:boolean = true;
    protected _errors:Array<any>;
    protected _message:string;

    constructor(responseParams:ApiResponseContract) {
        this.response = responseParams;
    }

    public get response():ApiResponseContract {
        return {
            "error": this.error,
            "code": this.code,
            "message": this.message,
            "errors": this.errors,
            "data": this.data,
        } as ApiResponseContract;
    }
    public set response(response:ApiResponseContract) {
        this._response = response;
    }

    public get error():boolean {
        return this._error;
    }
    public set error(error:boolean) {
        this._error = error;
    }

    public get errors():Array<any> {
        return this._errors;
    }
    public set errors(errors:Array<any>) {
        this._errors = errors;
    }

    public get code():number {
        return this._code;
    }
    public set code(code:number) {
        this._code = code;
    }

    public get message():string {
        return this._message;
    }
    public set message(message:string) {
        this._message = message;
    }

    public get data():object {
        return this._data;
    }
    public set data(message:object) {
        this._data = message;
    }
}