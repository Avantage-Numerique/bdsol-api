import {SocialHandle} from "@src/Database/Schemas/SocialHandleSchema";
import {Meta} from "@src/Moderation/Schemas/MetaSchema";
import {Document, ObjectId} from "mongoose";

export interface EquipmentSchema extends Document {
    equipmentType:ObjectId;
    label:string;
    description:string;
    brand:string;
    modelName:string;
    slug:string;
    mainImage:ObjectId;
    url:[SocialHandle];
    meta:Meta;
}