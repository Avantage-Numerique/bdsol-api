import mongoose from "mongoose";
import {Document} from "mongoose"
import { Teammate } from "../../Abstract/Schema/TeammateSchema";

export interface OrganisationSchema extends Document {
    name:string;
    slug:string;
    description:string;
    url:string;
    contactPoint:string;
    fondationDate:Date;
    offers:[object],
    team: [Teammate],
}
