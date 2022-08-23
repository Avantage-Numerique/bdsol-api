import type {ApiResponseContract} from "../../Http/Responses/ApiResponse";

export interface SeederContract {
    up: (entity:string) => Promise<void>;
    onUp: (error:any, result:any) => void;
    down: () => Promise<void>;
    onDown: (error:any, result:any) => void;
    fake: (data:any) => Promise<ApiResponseContract>
}