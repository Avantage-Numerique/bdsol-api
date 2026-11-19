import { Document, Schema } from "mongoose";
import { SubMeta } from "@src/Moderation/Schemas/MetaSchema";

export interface PostalAddressSchema extends Document {
    // streetAddress: "string",
    // extendedAddress: "string",
    // postOfficeBoxNumber: "string",
    address: string;
    city: string;

    // addressRegion: "AdminstrativeArea | string",
    region: string;
    mrc: string;
    province: string;

    postalCode: string;
    country: string;

    subMeta: SubMeta;
}

export class PostalAddress {
    /** @static schema */
    static schema: Schema = new Schema<PostalAddressSchema>(
        {
            address: {
                type: String,
            },
            city: {
                type: String,
            },
            region: {
                type: String,
            },
            mrc: {
                type: String,
            },
            province: {
                type: String,
            },
            postalCode: {
                type: String,
            },
            country: {
                type: String,
            },
            subMeta: {
                type: SubMeta.schema,
            },
        },
        { _id: false }
    );
}
