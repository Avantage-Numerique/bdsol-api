import mongoose, {Schema} from "mongoose";
import { Status } from "../../Moderation/Schemas/StatusSchema";


export interface SponsorSchema extends Document {
    name: string;
    entityId: mongoose.ObjectId;
    order: number;
    status: Status;
}


export class Sponsor {

    /** @static schema */
    static schema:Schema =
    new Schema<SponsorSchema>({
        name: {
            type: String,
            required: [true, 'Required memberId to identify member'],
            ref: "Person"
        },
        //Id of the entity linked if exist
        entityId: {
            type: mongoose.Types.ObjectId,
            ref: "Organisation" //Investigate on dynamic populate or refPath
        },
        order: {
            type: Number,
        },
        status: {
            type: Status.schema,
            required: true
        }
    },
        {
            timestamps: true
        }
    );
}