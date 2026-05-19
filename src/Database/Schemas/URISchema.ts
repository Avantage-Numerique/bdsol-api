import { Schema } from "mongoose";

export interface UriSchema {
    value: string;
}

export class UriObject {
    /** @static schema */
    static schema: Schema = new Schema<UriSchema>(
        {
            value: {
                type: String,
                required: true,
            },
        },
        {
            timestamps: false,
            _id: false,
        }
    );
}
