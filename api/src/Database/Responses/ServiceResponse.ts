
export default interface ServiceResponse {

    error:boolean;
    code:number;//statusCode - ?
    message:string;
    errors: [];
    data: {};
    //Add Meta data ? To host like totals, schema type, etc.
    //stucture
}