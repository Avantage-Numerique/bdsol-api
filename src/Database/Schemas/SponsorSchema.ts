import mongoose, {Schema} from "mongoose";
import { Status } from "../../Moderation/Schemas/StatusSchema";


export interface SponsorSchema extends Document {
    name: string;
    organisationId: mongoose.ObjectId;
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
        //Id of the organisation if exist
        organisationId: {
            type: mongoose.Types.ObjectId,
            ref: "Organisation"
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