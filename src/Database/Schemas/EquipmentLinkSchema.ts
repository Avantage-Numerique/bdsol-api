import mongoose, {Document, ObjectId, Schema} from "mongoose";
import {SubMeta} from "@src/Moderation/Schemas/MetaSchema";


export interface EquipmentLinkSchema extends Document {
    label: string;
    equipment: ObjectId;
    technology: ObjectId;
    subMeta:SubMeta
}


export class EquipmentLink {

    /** @static schema */
    static schema:Schema =
    new Schema<EquipmentLinkSchema>({
        label: {
            type:String
        },
        equipment: {
            type: mongoose.Types.ObjectId,
            refPath: "Equipment"
        },
        technology: {
            type: mongoose.Types.ObjectId,
            refPath: "Taxonomy"
        },
        subMeta: {
            type: SubMeta.schema
        }
    },{ _id : false }
    );
}
