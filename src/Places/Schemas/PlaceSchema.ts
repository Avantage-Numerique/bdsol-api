import { Location } from "@src/Database/Schemas/LocationSchema";
import {Meta} from "@src/Moderation/Schemas/MetaSchema";
import {ObjectId} from "mongodb";
import mongoose, {Document} from "mongoose";

export interface PlaceSchema extends Document {
    name:string,
    description:string,
    shortDescription:string,
    rooms:[object],
    placeType: [mongoose.ObjectId],
    slug:string,
    mainImage:mongoose.ObjectId,
    location: Location,
    nomatimObject: object,
    meta:Meta
}