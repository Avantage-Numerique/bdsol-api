import mongoose, { Document, Schema } from "mongoose";
import { SubMeta } from "@src/Moderation/Schemas/MetaSchema";

export interface DomainListSchema extends Document {
    domain: mongoose.ObjectId;
    subMeta: SubMeta;
}

export class DomainList {
    /** @static schema */
    static schema: Schema = new Schema<DomainListSchema>(
        {
            domain: {
                type: Schema.Types.ObjectId,
                ref: "Taxonomy",
            },
            subMeta: {
                type: SubMeta.schema,
            },
        },
        { _id: false }
    );
}
