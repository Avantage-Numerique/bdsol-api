import {Document, Schema} from "mongoose";

export interface LocationSchema extends Document {
    name:string,
    city:string,
    address:string;
    zipCode:string;
    latitude:string;
    longitude:string;
    //status:Status;
}

export class Location {

    /** @static schema*/
    static schema:Schema = 
    new Schema<LocationSchema>({
            name: {
                type: String
            },
            city: {
                type: String
            },
            zipCode: {
                type: String
            },
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