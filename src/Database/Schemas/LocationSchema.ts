import mongoose, {Schema} from "mongoose";
import { Status } from "../../Moderation/Schemas/StatusSchema";



export interface LocationSchema extends Document {
    latitude:string;
    longitude:string;
    status:Status;
}

export class Location {

    /** @static schema*/
    static schema:Schema = 
    new Schema<LocationSchema>({
        latitude: {
            type: String,
        },
        longitude: {
            type: String,
        },
        status: {
            type: Status.schema
        }
    }, {
        timestamps: true
        }
    );
}