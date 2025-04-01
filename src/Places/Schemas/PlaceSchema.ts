import { Location } from "@src/Database/Schemas/LocationSchema";
import {Meta} from "@src/Moderation/Schemas/MetaSchema";
import {ObjectId} from "mongodb";
import {Document} from "mongoose";

export interface PlaceSchema extends Document {
    name:string,
    description:string,
    smallDescription:string,
    rooms:[object],
    placeType: string,
    slug:string,
    mainImage:ObjectId,
    location: Location,
    nomatimObject: object,
    meta:Meta
}