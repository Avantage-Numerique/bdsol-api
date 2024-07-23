import mongoose, {Document, ObjectId, Schema} from "mongoose";
import {SubMeta} from "@src/Moderation/Schemas/MetaSchema";


export interface EquipmentLinkSchema extends Document {
    equipment: ObjectId;
    qty: number;
    subMeta:SubMeta
}


export class EquipmentLink {

    /** @static schema */
    static schema:Schema =
    new Schema<EquipmentLinkSchema>({
        equipment: {
            type: mongoose.Types.ObjectId,
            ref: "Equipment"
        },
        qty: {
            type: Number
        },
        subMeta: {
            type: SubMeta.schema
        }
    },{ _id : false }
    );
}
