import mongoose, { Document } from "mongoose";
import { ObjectId } from "mongodb";

import { Meta } from "@src/Moderation/Schemas/MetaSchema";
import { Location } from "@src/Database/Schemas/LocationSchema";
import { Room } from "./RoomSchema";

export interface PlaceSchema extends Document {
    name: string;
    description: string;
    shortDescription: string;
    rooms: [Room];
    placeType: [ObjectId];
    slug: string;
    mainImage: ObjectId;
    location: Location;
    nomatimObject: object;
    meta: Meta;
}
