import { SocialHandle } from "@src/Database/Schemas/SocialHandleSchema";
import { Meta } from "@src/Moderation/Schemas/MetaSchema";
import { Document, ObjectId } from "mongoose";
import { UriSchema } from "@src/Database/Schemas/URISchema";

export interface EquipmentSchema extends Document {
    equipmentType: ObjectId;
    label: string;
    description: string;
    shortDescription: string;
    brand: string;
    modelName: string;
    slug: string;
    mainImage: ObjectId;
    url: [SocialHandle];
    meta: Meta;
    uri: UriSchema;
}
