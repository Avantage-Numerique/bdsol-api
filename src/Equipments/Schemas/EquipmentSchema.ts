import { Meta } from "@src/Moderation/Schemas/MetaSchema";
import {Document, ObjectId} from "mongoose";

export interface EquipmentSchema extends Document {
    equipementType:string;
    label:string;
    description:string;
    brand:string;
    model:string;
    slug:string;
    mainImage:ObjectId;
    url:string;
    meta:Meta;
}