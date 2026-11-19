import { Document } from "mongoose";
import { ObjectId } from "mongodb";

import { Meta } from "@src/Moderation/Schemas/MetaSchema";
import { PostalAddress } from "./PostalAddressSchema";
// import { Room } from "./RoomSchema";

export interface PlaceSchema extends Document {
    name: string;
    description: string;
    shortDescription: string;
    slug: string;
    mainImage: ObjectId;

    postalAddress: PostalAddress;
    latitude: string;
    longitude: string;

    placeType: [ObjectId];
    // rooms: [Room];  // NOTE: ==> PAS V1, mais important pour DataScene
    nomatimObject: object;

    // sameAs: SameAS // TODO: ajouter après merge de ref-compat

    meta: Meta;
}
