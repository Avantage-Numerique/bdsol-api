import {Schema} from "mongoose";
import { Status } from "../Moderation/Schemas/StatusSchema";
import { fileTypeList, fileExtensionList } from "./List/FileList";
import { licenceList } from "./List/LicenceList";

export interface MediaSchema extends Document {
    title: string,
    alt: string,
    description: string,
    path: string,
    licence: string,
    fileType: string,
    extension: string,
    slug: string,
    status: Status;
}

export class Media {
    static schema:Schema =
    new Schema<MediaSchema>(
        {
            title: {
                type: String
            },
            alt: {
                type: String
            },
            description: {
                type: String
            },
            path: {
                type: String
            },
            licence: {
                type: String,
                enum: licenceList
            },
            fileType: {
                type: String,
                enum: fileTypeList
            },
            extension: {
                type: String,
                enum: fileExtensionList
            },
            slug: {
                type: String,
                slug: ["title"],
                slugPaddingSize: 3,
                index: true,
                unique: true
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