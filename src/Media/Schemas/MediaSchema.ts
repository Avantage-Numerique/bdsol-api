import mongoose, {Document} from "mongoose";
import {Meta} from "@src/Moderation/Schemas/MetaSchema";

export interface MediaSchema extends Document {
    title: string;
    alt: string;
    description: string;
    path: string;
    url: string;
    licence: string;
    fileType: string;
    fileName: string;
    extension: string;
    mediaField: string;
    slug: string;
    entityId: mongoose.ObjectId;
    entityType: string;
    uploadedBy: mongoose.ObjectId;
    dbStatus: string;
    meta: Meta;
}