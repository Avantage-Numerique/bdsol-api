import {Schema} from "mongoose";

export interface LocationSchema extends Document {
    address:string;
    latitude:string;
    longitude:string;
    //status:Status;
}

export class Location {

    /** @static schema*/
    static schema:Schema = 
    new Schema<LocationSchema>({
            address: {
                type: String
            },
            latitude: {
                type: String
            },
            longitude: {
                type: String
            }
        }, { _id : false }
    );
}