import { Location } from "@src/Database/Schemas/LocationSchema";
import {Meta} from "@src/Moderation/Schemas/MetaSchema";
import mongoose, {Document} from "mongoose";
import { Room } from "./RoomSchema";

export interface PlaceSchema extends Document {
    name:string,
    description:string,
    shortDescription:string,
    rooms:[Room],
    placeType: [mongoose.ObjectId],
    slug:string,
    mainImage:mongoose.ObjectId,
    location: Location,
    nomatimObject: object,
    meta:Meta
}