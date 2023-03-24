import {Document} from "mongoose"
import { StatusSchema } from "../../Moderation/Schemas/StatusSchema";
import {DomainSchema} from "./DomainSchema";

export interface TaxonomySchema extends Document {
    category:string;
    name:string;
    slug:string;
    description:string;
    domains:[DomainSchema];
    source:string;
    status:StatusSchema;
}
