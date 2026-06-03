import { Document, Schema } from "mongoose";
import { SubMeta } from "@src/Moderation/Schemas/MetaSchema";

export interface SameAsSchema extends Document {
    label: string;
    url: string;
    subMeta: SubMeta;
}

export class SameAs {
    /** @static schema */
    static schema: Schema = new Schema<SameAsSchema>(
        {
            label: {
                type: String,
            },
            url: {
                type: String,
            },
            subMeta: {
                type: SubMeta.schema,
            },
        },
        { _id: false }
    );
}
