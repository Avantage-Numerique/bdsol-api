import { Meta } from "@src/Moderation/Schemas/MetaSchema";
import { ObjectId } from "mongodb";
import { Document } from "mongoose";
import { UriObject } from "@src/Database/Schemas/URISchema";
import { SameAs } from "@src/Database/Schemas/SameAsSchema";

export interface PlaceSchema extends Document {
    name: string;
    description: string;
    shortDescription: string;
    slug: string;
    mainImage: ObjectId;
    address: string;
    city: string;
    region: string;
    mrc: string;
    province: string;
    postalCode: string;
    country: string;
    latitude: string;
    longitude: string;
    sameAs: SameAs;
    meta: Meta;
    uri: UriObject;
}
