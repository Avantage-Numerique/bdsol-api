import mongoose, {Document, Schema} from "mongoose";
import {SubMeta} from "@src/Moderation/Schemas/MetaSchema";
import { Location } from "@src/Database/Schemas/LocationSchema";
import { StringLiteral } from "typescript";

/* Made according to https://datascene.ca/references/proprietes/salle/
Links between field name : theirs ==> ours :
Identifiants ==> _id
Nom ==> name
Nom identique à celui du lieu ==> placeName
Description ==> description
Description courte ==> shortDescription
Média(s) ==> mainImage
Lieu ==> placeId
Adresse ==> location
Informations ==> accessibilityInformation
Configuration de la salle ==> config.space
Configuration type ==> config.roomConfigType
Configuration capacité ==> config.roomConfigCapacity
*/



export interface RoomSchema extends Document {
    name: string;
    placeName: string;
    description: string;
    shortDescription: string;
    mainImage: mongoose.ObjectId;
    placeId: mongoose.ObjectId;
    location: Location;
    accessibilityInformation: object;
    config: object;
    subMeta: SubMeta;
}

export class Room {
    /** @static schema */
    static schema:Schema = new Schema<RoomSchema>({
        name: {
            type: String
        },
        placeName: {
            type: String,
        },
        description: {
            type: String
        },
        shortDescription: {
            type: String,
        },
        mainImage: {
            type: mongoose.Types.ObjectId,
            ref : "Media"
        },
        placeId: {
            type: mongoose.Types.ObjectId,
            ref : "Place"
        },
        location: {
            type: Location.schema
        },
        accessibilityInformation: {
            type: Object,
        },
        config: {
            space: {
                type: Object,
            },
            roomConfigType: {
                type: Object,
            },
            roomConfigCapacity: {
                type: Number,
            },

        },
        subMeta: {
            type: SubMeta.schema
        },
    }, { _id : true });
}
