import { Status } from "@src/Moderation/Schemas/StatusSchema";
import { ObjectId } from "mongodb";
import {Document} from "mongoose";

export interface PlaceSchema extends Document {
    name:string,
    description:string,
    slug:string,
    mainImage:ObjectId,
    address:string,
    city:string,
    region:string,
    mrc:string,
    province:string,
    postalCode:string,
    country:string,
    latitude:string,
    longitude:string,
    status:Status
}