import UsersHistoryService from "../Services/UsersHistoryService";
import UserHistory from "../Models/UserHistory";
import LogHelper from "../../Monitoring/Helpers/LogHelper";
import {UserHistorySchema} from "../Schemas/UserHistorySchema";
import {ApiResponseContract} from "../../Http/Responses/ApiResponse";

export class UserHistoryComposer {

    public async createHistoryHanlder(req:any, res:any, response:any, action:string):Promise<ApiResponseContract> {

        //const userHistoryService:UsersHistoryService = UsersHistoryService.getInstance(UserHistory.getInstance());

        LogHelper.log("Create UserHistory ", req.user, );


        //Action on the data
        //action <---

        //Set modified fields
        //DELETE NOT WORKING THERE
        delete response._id;
        delete response.createdAt;
        delete response.updatedAt;
        delete response.__v;

        return await this.insertUserHistory(this._constructHistoryData({
            user_id: req.user.id,
            id: "",
            modifDate: new Date(),
            modifiedEntity: response.data._id,
            action: action,
            fields: response.data
        }))
    }

    protected _constructHistoryData(data:any):UserHistorySchema
    {
        return {
            "user": data.user_id,
            "ipAddress": data.ip,
            "modifDate": data.modifDate,
            "modifiedEntity": data.modifiedEntity,
            "action": data.action,
            "fields": data.fields,
        } as UserHistorySchema;
    }

    protected async insertUserHistory(data:UserHistorySchema):Promise<ApiResponseContract> {

        const userHistoryService:UsersHistoryService = UsersHistoryService.getInstance(UserHistory.getInstance());

        //Service call to add UserHistory
        return  userHistoryService.insert(data);
    }

}