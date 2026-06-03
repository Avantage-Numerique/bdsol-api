import { Document, ObjectId } from "mongoose";

import { SocialHandle } from "@src/Database/Schemas/SocialHandleSchema";
import { SameAs } from "@src/Database/Schemas/SameAsSchema";
import { Meta } from "@src/Moderation/Schemas/MetaSchema";

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
    sameAs: [SameAs];
    meta: Meta;
}
