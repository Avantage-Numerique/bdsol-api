import {Document} from "mongoose"
import { StatusSchema } from "../../Moderation/Schemas/StatusSchema";

export interface TaxonomySchema extends Document {
    category:string;
    name:string;
    slug:string;
    description:string;
    source:string;
    status:StatusSchema;
}
