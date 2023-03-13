import mongoose from "mongoose";
import { Status } from "../../Moderation/Schemas/StatusSchema";

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
    slug: string;
    entityId: mongoose.ObjectId;
    entityType: string;
    uploadedBy: mongoose.ObjectId;
    dbStatus: string;
    status: Status;
}