import mongoose from "mongoose";
import { Status } from "../../Database/Schemas/StatusSchema";

export interface MediaSchema extends Document {
    title: string;
    alt: string;
    description: string;
    path: string;
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