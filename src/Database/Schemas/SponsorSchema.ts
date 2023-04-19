import mongoose, {Schema} from "mongoose";
import { Status } from "../../Moderation/Schemas/StatusSchema";


export interface SponsorSchema extends Document {
    name: string;
    entity: mongoose.ObjectId;
    entityType: string;
    order: number;
    status: Status;
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
        order: {
            type: Number,
        },
        status: {
            type: Status.schema,
            //required: true
        }
    },
        {
            timestamps: true
        }
    );
}