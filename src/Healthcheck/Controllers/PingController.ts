import {ApiResponseContract} from "../../Http/Responses/ApiResponse";
import {SuccessResponse} from "../../Http/Responses/SuccessResponse";
import {ReasonPhrases, StatusCodes} from "http-status-codes";

//set http headers 200,500, etc here ?

export default class PingController
{
    public async ping(): Promise<ApiResponseContract>
    {
        return SuccessResponse.create(
            {
                "/ping": "OK",
            },
            StatusCodes.OK,
            ReasonPhrases.OK
        );
    }
}
