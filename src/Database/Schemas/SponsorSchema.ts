import mongoose, {Document, Schema} from "mongoose";
import {SubMeta} from "@src/Moderation/Schemas/MetaSchema";


export interface SponsorSchema extends Document {
    name: string;
    entity: mongoose.ObjectId;
    entityType: string;
    subMeta: SubMeta;
}


export class Sponsor {

    /** @static schema */
    static schema:Schema =
    new Schema<SponsorSchema>({
        name: {
            type: String,
        },
        //Id of the entity linked if exist
        entity: {
            type: mongoose.Types.ObjectId,
            refPath: "sponsor.entityType"
            //required: true
        },
        entityType: {
            type: String,
            required: true,
            enum: ['Person', 'Organisation']
            //required: true
        },
        subMeta: {
            type: SubMeta.schema,
            //required: true
        }
    },
        {
            timestamps: false,
            _id:false
        }
    );
}