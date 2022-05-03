import {ApiResponseContract} from "../../Http/Responses/ApiResponse";

export default interface ServiceResponse extends ApiResponseContract {

    error:boolean;
    code:number;//statusCode - ?
    message:string;
    errors: [];
    data: {};
    //Add Meta data ? To host like totals, schema type, etc.
    //stucture
}