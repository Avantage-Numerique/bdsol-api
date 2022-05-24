
export interface ApiResponseContract {

    error:boolean;
    code:number;//statusCode - ?
    message:string;
    errors:Array<any>;
    user: object;
    data: object;
}

export default class ApiResponse implements ApiResponseContract {

    //public statusCode;
    protected _rawResponse:ApiResponseContract;
    protected _response:ApiResponseContract;
    protected _data:object;
    protected _user:object;
    protected _code:number;
    protected _error:boolean = true;
    protected _errors:Array<any>;
    protected _message:string;

    constructor(responseParams:ApiResponseContract) {
        this.error = responseParams.error;
        this.code = responseParams.code;
        this.message = responseParams.message;
        this.errors = responseParams.errors;
        this.user = responseParams.user;
        this.data = responseParams.data;
        this.response = responseParams;
    }

    public get response():ApiResponseContract {
        return {
            "error": this.error,
            "code": this.code,
            "message": this.message,
            "errors": this.errors,
            "user": this.user,
            "data": this.data,
        } as ApiResponseContract;
    }
    public set response(response:ApiResponseContract) {
        this._rawResponse = response;
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
    public set data(value:object) {
        this._data = value;
    }

    public get user():object {
        return this._user;
    }
    public set user(value:object) {
        this._user = value;
    }
}