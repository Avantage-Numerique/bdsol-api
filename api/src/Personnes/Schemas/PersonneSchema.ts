import {Schema, Document} from "mongoose"
/**
 *
 *
 */

export interface PersonneSchema extends Document {
    nom:string;
    prenom:string;
    surnom:string;
    description:string

}

export const PersonneSchema = new Schema<PersonneSchema>({
        nom: { type: String, required: true },
        prenom: { type: String, required: true},
        surnom: String,
        description: String
    },
        {
            timestamps: true
});