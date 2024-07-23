import { EntityTypesEnum } from "@src/Entities/EntityTypes";
import { ObjectId } from "mongodb";
import {Document} from "mongoose";

export interface CommunicationSchema extends Document {
    communicationType:string;
    name:string;
    email:string;
    message:string;
    date:Date;
    reportedEntityId:ObjectId;
    reportedEntityType:EntityTypesEnum;
    reportedEntitySlug:String;
    userInfo: Object;
}