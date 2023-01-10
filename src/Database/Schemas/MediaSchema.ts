import mongoose, {Schema} from "mongoose";
import { Status } from "../../Moderation/Schemas/StatusSchema";

export enum fileTypeEnum {
    image = "occupations",
    Domains = "domains",
    Abilities = "abilities",
    Skills = "skills"
}

export enum fileExtensionEnum {
    image = "occupations",
    Domains = "domains",
    Abilities = "abilities",
    Skills = "skills"
}

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
                type: String
            },
            fileType: {
                type: String,
                enum: ["image", "video", "sound"]//fileTypeEnum
            },
            extension: {
                type: String,
                enum: ["mp3","mp4","png"] //fileExtensionEnum
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