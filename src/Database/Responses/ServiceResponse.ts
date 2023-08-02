import {ApiResponseContract} from "@src/Http/Responses/ApiResponse";

export default interface ServiceResponse extends ApiResponseContract {

    error:boolean;
    code:number;//statusCode - ?
    message:string;
    errors:Array<any>;
    data:any;
    //Add Meta data ? To host like totals, schema type, etc.
    //stucture
}