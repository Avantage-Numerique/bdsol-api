import {Document, Schema} from "mongoose";
import {Meta, SubMeta} from "@src/Moderation/Schemas/MetaSchema";


export interface SocialHandleSchema extends Document {
    label: string;
    url: string;
    subMeta: SubMeta
}


export class SocialHandle {

    /** @static schema */
    static schema:Schema =
    new Schema<SocialHandleSchema>({
        label: {
            type:String
        },
        url: {
            type: String
        },
        subMeta: {
            type: SubMeta.schema
        }
    },{ _id : false }
    );
}
