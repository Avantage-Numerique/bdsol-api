import {Schema, Document} from "mongoose"

export interface OrganisationSchema extends Document {
    nom:string;
    description:string;
    url:string;
    contactPoint:string
}
