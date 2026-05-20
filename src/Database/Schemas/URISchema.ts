import { SchemaDefinitionProperty } from "mongoose";

export interface UriSchema {
    uri: string;
}

export class UriObject {
    /** @static schema */
    static field: SchemaDefinitionProperty<string> = {
        type: String,
        required: true,
        unique: true,
        immutable: true,
    };
}
