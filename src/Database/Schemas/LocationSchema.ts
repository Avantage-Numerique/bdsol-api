import mongoose, {Document, ObjectId, Schema} from "mongoose";
import {SubMeta} from "@src/Moderation/Schemas/MetaSchema";


export interface LocationSchema extends Document {
    address: string,
    city: string,
    region: string,
    mrc: string,
    province: string,
    postalCode: string,
    country: string,
    latitude: string,
    longitude: string,
    subMeta:SubMeta
}


export class Location {

    /** @static schema */
    static schema:Schema =
    new Schema<LocationSchema>({
        address: {
            type: String
        },
        city: {
            type: String
        },
        region: {
            type: String
        },
        mrc: {
            type: String
        },
        province: {
            type: String
        },
        postalCode: {
            type: String
        },
        country: {
            type: String
        },
        latitude: {
            type: String
        },
        longitude: {
            type: String
        }
    },{ _id : false }
    );
}